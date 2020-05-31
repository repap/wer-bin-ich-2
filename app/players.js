const players = []

const GAME_STATES = {
  PREPERATION: 'preperation',
  AWAIT_RUNNING: 'awaitRunning',
  RUNNING: 'running'
}

const createPlayer = (socket, gameId) => ({
  id: socket.id,
  name: null,
  alias: 'test',
  gameId,
  gameState: GAME_STATES.PREPERATION,
})

module.exports = {
  GAME_STATES,
  addPlayer: (socket, gameId) => {
    const player = createPlayer(socket, gameId)
    players.push(player)
    return player
  },
  getPlayers: () => players,
  removePlayer: id => {
    const player = players.find(p => p.id === id)
    console.log(players.indexOf(player))
    players.splice(players.indexOf(player), 1)
  }
}