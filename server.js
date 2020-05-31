const { join } = require('path')
const { createServer } = require('http')
const socketio = require('socket.io')
const express = require('express');
const players = require('./app/players')
const games = require('./app/games')

const app = express();
const server = createServer(app)
const io = socketio(server)

const createPlayerData = ({ alias, ...playerData }, currentId) => (
  playerData.id === currentId 
    ? playerData
    : { ...playerData, alias }
)

const createGameData = (players, currentId) => {
  const currentPlayer = players.find(p => p.id === currentId)
  const playerData = createPlayerData(currentPlayer, currentId)
  return {
    ...playerData,
    gameState: currentPlayer.gameState,
    players: players.map(p => createPlayerData(p, currentId))
  }
}

const getPlayersInGame = (players, gameId) => players
  .filter(p => p.gameId == gameId)

const sendUpdateToPlayers = (players, gameId) => {
  getPlayersInGame(players, gameId).forEach(player => {
    const gameData = createGameData(
      getPlayersInGame(players, gameId),
      player.id,
    )
    io.to(player.id).emit('updateGame', gameData)
  });
}

io.on('connection', socket => {
  socket.on('joinGame', ({ gameId }) => {
    const player = players.addPlayer(socket, gameId)
    const gameData = createGameData(
      getPlayersInGame(players.getPlayers(), gameId), 
      player.id,
    )
    // send data to this socket only
    // sendUpdateToPlayers(players.getPlayers(), gameId)
    socket.emit('updateGame', gameData)
    socket.emit('createName', {id: player.id, gameId})
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

  socket.on('setReady', data => {
    // set player ready
    // check if all players are ready
      // send gameState -> awaitRunning
      // create Timeout 5 second
        // send createAlias event
        // send gameState -> running
  })

  socket.on('restart', data => {
    // set player to restart
    // check if all players are ready
      // send gameState -> preperation
  })

  socket.on('disconnect', () => {
    const player = players.getPlayers().find(p => p.id === socket.id)    
    const gameId = player.gameId
    players.removePlayer(player.id)
    sendUpdateToPlayers(players.getPlayers(), gameId)
  })
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