const { v4: uuidv4 } = require('uuid');

const games = []

module.exports = {
  createGame: () => {
    const id = uuidv4();
    games.push(id)
    return id
  },
  getGames: () => games,
}