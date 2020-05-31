require('dotenv').config()
const { join } = require('path')
const { createServer } = require('http')
const socketio = require('socket.io')
const express = require('express');
const players = require('./app/players')
const games = require('./app/games')

const app = express();
const server = createServer(app)
const io = socketio(server)

const PORT = 3333 || process.env.PORT;

const createPlayerData = ({ alias, ...playerData }, currentId) => (
  playerData.id === currentId 
    ? playerData
    : { ...playerData, alias }
)

const getCurrentPlayer = (players, id) => players.find(p => p.id === id)

const createGameData = (players, currentId) => ({
  ...createPlayerData(getCurrentPlayer(players, currentId), currentId),
  players: players.map(p => createPlayerData(p, currentId))
})

const sendUpdateToPlayers = (players, game, event = 'updateGame') => {
  players.forEach(player => {
    const gameData = createGameData(
      players,
      player.id,
    )
    io.to(player.id).emit(event, {...gameData, gameState: game.state})
  });
}

const setInitialState = players => players.forEach(p => {
  p.requestAlias = null
  p.aliasIsRequested = null
  p.isRestartRequested = null
  p.isReady = null
  p.alias = null
})

const setRequestAlias = (players, player) => {
  const playersWithoutAlias = players
    .filter(p => !p.requestAlias && p.id !== player.id && !p.aliasIsRequested)
  
  const randomIndex = Math.floor((playersWithoutAlias.length - 1) * Math.random())
  const playerToRequestAlias = !playersWithoutAlias.length
    ? players.find(p => !p.aliasIsRequested)
    : playersWithoutAlias[randomIndex]

  playerToRequestAlias.aliasIsRequested = true;
  player.requestAlias = playerToRequestAlias.id

  if (players.find(p => !p.requestAlias)) {
    setRequestAlias(players, playerToRequestAlias)
  }
}

const areAllPlayersReady = players => !players.find(p => !p.isReady)
const areAllPlayersRequestedRestart = players => !players
.filter(p => p.isReady)
.find(p => !p.isRestartRequested)

io.on('connection', socket => {
  socket.on('joinGame', ({ gameId }) => {
    const player = players.addPlayer(socket, gameId)
    const gameData = createGameData(
      players.getPlayers(gameId), 
      player.id,
    )
    // send data to this socket only
    // sendUpdateToPlayers(players.getPlayers(gameId))
    socket.emit('updateGame', gameData)
    socket.emit('createName', {
      id: player.id,
      gameId,
      gameState: games.getGames(gameId).state,
    })
  })

  socket.on('setName', ({ gameId, id, name }) => {
    const player = getCurrentPlayer(players.getPlayers(gameId), id)
    player.name = name
    sendUpdateToPlayers(players.getPlayers(gameId), games.getGames(gameId))
  })

  socket.on('setAlias', ({ gameId, id, alias, aliasId }) => {
    const aliasPlayer = getCurrentPlayer(players.getPlayers(gameId), aliasId)
    aliasPlayer.alias = alias
    sendUpdateToPlayers(players.getPlayers(gameId), games.getGames(gameId))
  })

  socket.on('setReady', ({ gameId, id, isReady }) => {
    // set player ready
    const player = getCurrentPlayer(players.getPlayers(gameId), id)
    player.isReady = isReady
    // check if all players are ready
    if (areAllPlayersReady(players.getPlayers(gameId))) {
      // send gameState -> awaitRunning
      // create Timeout 5 second
        // create new gamesState incl. gameState -> running & setAliasFor
      setRequestAlias(players.getPlayers(gameId), player)
      games.getGames(gameId).state = games.GAME_STATES.RUNNING
        // send createAlias event
      sendUpdateToPlayers(players.getPlayers(gameId), games.getGames(gameId), 'createAlias')
    }
  })

  socket.on('restart', ({ gameId, id, isRestartRequested }) => {
    // set player to restart
    const player = getCurrentPlayer(players.getPlayers(gameId), id)
    player.isRestartRequested = isRestartRequested
    // check if all players are ready
    if (areAllPlayersRequestedRestart(players.getPlayers(gameId))){
      // send gameState -> preperation
      setInitialState(players.getPlayers(gameId))
      games.getGames(gameId).state = games.GAME_STATES.PREPERATION

      sendUpdateToPlayers(players.getPlayers(gameId), games.getGames(gameId))
    }
  })

  socket.on('disconnect', () => {
    const player = getCurrentPlayer(players.getPlayers(), socket.id)
    const gameId = player.gameId
    players.removePlayer(player.id)
    sendUpdateToPlayers(players.getPlayers(gameId), games.getGames(gameId))
  })
})

app.use(express.static(join(__dirname, 'public')));

app.get('/creategame', (req, res) => {
  // create a new game
  const gameId = games.createGame().id
  // redirect to game with id
  res.redirect(`/game/${gameId}`)
})

app.get('/game/:id?', (req, res) => {
  const { id } = req.params;
  if (games.getGames(id)) {
    return res.sendFile(join(__dirname, 'public', 'game.html'))
  }
  res.redirect('/')
})

server.listen(PORT, err => 
  err ? console.error(err) : console.log(`App is running on port: ${PORT}`))