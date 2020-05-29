const { v4: uuidv4 } = require('uuid');

const playerFactory = (gameId, socket) => {
  const state = {
    gameId,
    socket,
    id: uuidv4(),
    name: null,
    alias: null,
  }

  return {
    getId: () => state.id,
    getGameId: () => state.gameId,
    getSocket: () => state.socket,
    getName: () => state.name,
    setName: name => state.name = name,
    getAlias: () => state.alias,
    setAlias: alias => state.alias = alias,
  }
}
module.exports = playerFactory