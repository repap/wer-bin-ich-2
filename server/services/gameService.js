const GameModel = require('../models/gameModel')

module.exports = ({ games, users }) => socket => {
  return {
    join: ({ gameId, userId }) => {
      games.get(gameId).addPlayer(userId)
    },
    leave: ({ gameId, userId }) => {
      games.get(gameId).removePlayer(userId)
    },
    restart: ({ gameId }) => {
      games.get(gameId).reset()
    },
    ready: ({ gameId }) => {
      games.get(gameId).setState('IN_GAME')
    },
    create: () => {
      games.add(new GameModel())
    },
  }
}