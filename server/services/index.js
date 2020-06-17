const createStore = require('../createStore')
const createGameService = require('./gameService')
const createUserService = require('./userService')

const store = {
  games: createStore(),
  users: createStore(),
}

module.exports = {
  gameService: createGameService(store),
  userService: createUserService(store),
}