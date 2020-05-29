const playerFactory = require('./playerFactory')

const players = []

module.exports = {
  getPlayers: () => players,
  getPlayer: id => players.find(g => g.getId() === id),
  createPlayer: (gameId, client) => {
    const player = playerFactory(gameId, client)
    players.push(player)
    return player.getId()
  },
  removePlayer: id => {
    const playerToRemove = players.find(g => g.getId() === id)
    if (playerToRemove) {
      players.splice(players.indexOf(playerToRemove), 1)
    }
    return playerToRemove.getId()
  }
}