const players = []

const createPlayer = (socket, gameId) => ({
  id: socket.id,
  name: null,
  alias: null,
  gameId,
})

module.exports = {
  addPlayer: (socket, gameId) => {
    const player = createPlayer(socket, gameId)
    players.push(player)
    return player
  },
  getPlayers: gameId => (
    gameId
      ? players.filter(p => p.gameId == gameId) 
      : players
  ),
  removePlayer: id => {
    const player = players.find(p => p.id === id)
    players.splice(players.indexOf(player), 1)
  }
}