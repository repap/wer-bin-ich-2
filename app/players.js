const players = []

const createPlayer = (socket, gameId) => ({
  id: socket.id,
  name: null,
  alias: null,
  socket,
  gameId,
})

module.exports = {
  addPlayer: (socket, gameId) => {
    const player = createPlayer(socket, gameId)
    players.push(player)
    return player.id
  },
  getPlayers: () => players,
  removePlayer: id => {
    const player = players.find(p => p.id === id)
    console.log(players.indexOf(player))
    players.splice(players.indexOf(player), 1)
  }
}