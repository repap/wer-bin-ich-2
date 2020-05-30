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
  getPlayers: () => players
}