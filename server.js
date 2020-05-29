const { join } = require('path')
const { createServer } = require('http')
const socketio = require('socket.io')
const express = require('express');
const gameManager = require('./app/gameManager')
const playerManager = require('./app/playerManager')

const app = express();
const server = createServer(app)
const io = socketio(server)

const sendGameData = game => {
  const players = game.getPlayers().map(p => ({
    id: playerManager.getPlayer(p).getId(),
    alias: playerManager.getPlayer(p).getAlias(),
    name: playerManager.getPlayer(p).getName(),
    socket: playerManager.getPlayer(p).getSocket()
  }))

  players.forEach(p => {
    p.socket.emit('gameData', {
      id: p.id,
      gameId: game.getId(),
      players: players.map(e => ({
        id: e.id,
        alias: p.id === e.id ? null : e.alias,
        name: e.name,
      }))
    })
  })
}

io.on('connection', client => {
  console.log('connected')

  client.on('joinGame', data => {
    console.log(data)
    const { gameId } = data
    const game = gameManager.getGame(gameId)

    if (!game) {
      return client.disconnect(true)
    }
    const playerId = playerManager.createPlayer(gameId, client)
    game.addPlayer(playerId)
    
    sendGameData(game)
  })

  client.on('setName', data => {
    console.log(data)
    const { gameId, id, name } = data
    const game = gameManager.getGame(gameId)
    
    if (!game) {
      return client.disconnect(true)
    }
    playerManager.getPlayer(id).setName(name)
    
    sendGameData(game)
  })

  client.on('setAlias', data => {
    console.log(data)
    const { gameId, playerId, alias } = data
    const game = gameManager.getGame(gameId)

    if (!game) {
      return client.disconnect(true)
    }
    playerManager.getPlayer(playerId).setAlias(alias)
    
    sendGameData(game)
  })

  client.on('restart', data => {

  })

  client.on('disconnect', () => {

  })
})

const PORT = 3333 || process.env.PORT;

app.use(express.static(join(__dirname, 'public')));

app.get('/creategame', (req, res) => {
  // create a new game
  const gameId = gameManager.createGame()
  // redirect to game with id
  res.redirect(`/game/${gameId}`)
})

app.get('/game/:id?', (req, res) => {
  const { id } = req.params;
  if (gameManager.getGames().find(g => g.getId() === id)) {
    return res.sendFile(join(__dirname, 'public', 'game.html'))
  }
  res.redirect('/')
})

server.listen(PORT, err => 
  err ? console.error(err) : console.log(`App is running on port: ${PORT}`))