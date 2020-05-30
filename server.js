const { join } = require('path')
const { createServer } = require('http')
const socketio = require('socket.io')
const express = require('express');
const players = require('./app/players')
const games = require('./app/games')

const app = express();
const server = createServer(app)
const io = socketio(server)

const createPlayerData = (player, currentId) => {
  const playerData = {
    id: player.id,
    name: player.name,
    gameId: player.gameId,
  }

  if (player.id === currentId) {
    return playerData;
  }

  return {
    ...playerData,
    alias: player.alias,
  }
}

const createGameData = (players, currentId) => {
  const currentPlayer = players.find(p => p.id === currentId)
  const playerData = createPlayerData(currentPlayer, currentId)
  return {
    ...playerData,
    players: players.map(p => createPlayerData(p, currentId))
  }
}

const getPlayersInGame = (players, gameId) => players
  .filter(p => p.gameId == gameId)

const sendUpdateToPlayers = (players, gameId) => {
  getPlayersInGame(players, gameId).forEach(player => {
    const gameData = createGameData(players, player.id)
    io.to(player.id).emit('updateGame', gameData)
  });
}

io.on('connection', socket => {
  socket.on('joinGame', ({ gameId }) => {
    players.addPlayer(socket, gameId)
    sendUpdateToPlayers(players.getPlayers(), gameId)
  })

  socket.on('setName', ({ gameId, id, name }) => {
    const player = players.getPlayers().find(p => p.id === id)
    player.name = name
    sendUpdateToPlayers(players.getPlayers(), gameId)
  })

  socket.on('setAlias', ({ gameId, id, alias }) => {
    const player = players.getPlayers().find(p => p.id === id)
    player.alias = alias
    sendUpdateToPlayers(players.getPlayers(), gameId)
  })

  socket.on('restart', data => console.log(data))

  socket.on('disconnect', () => console.log('disconnected'))
})

const PORT = 3333 || process.env.PORT;

app.use(express.static(join(__dirname, 'public')));

app.get('/creategame', (req, res) => {
  // create a new game
  const gameId = games.createGame()
  // redirect to game with id
  res.redirect(`/game/${gameId}`)
})

app.get('/game/:id?', (req, res) => {
  const { id } = req.params;
  if (games.getGames().find(g => g === id)) {
    return res.sendFile(join(__dirname, 'public', 'game.html'))
  }
  res.redirect('/')
})

server.listen(PORT, err => 
  err ? console.error(err) : console.log(`App is running on port: ${PORT}`))