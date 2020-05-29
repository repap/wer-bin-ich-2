const gameFactory = require('./gameFactory')

const games = []

module.exports = {
  getGames: () => games,
  getGame: id => games.find(g => g.getId() === id),
  createGame: () => {
    const game = gameFactory()
    games.push(game)
    return game.getId()
  },
  removeGame: id => {
    const gameToRemove = games.find(g => g.getId() === id)
    if (gameToRemove) {
      games.splice(games.indexOf(gameToRemove), 1)
    }
    return gameToRemove.getId()
  }
}