const { v4: uuidv4 } = require('uuid');

const GAME_STATES = {
  PREPERATION: 'preperation',
  AWAIT_RUNNING: 'awaitRunning',
  RUNNING: 'running'
}

const games = []

const createGame = (id, state = GAME_STATES.PREPERATION) => ({
  id,
  state,
})

const getGame = (games, id) => games.find(g => g.id === id)

module.exports = {
  GAME_STATES,
  createGame: () => {
    const game = createGame(uuidv4());
    games.push(game)
    return game
  },
  getGames: id => id ? getGame(games, id) : games,
}