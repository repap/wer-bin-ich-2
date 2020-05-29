const { v4: uuidv4 } = require('uuid');

const gameFactory = () => {
  const id = uuidv4()
  const player = []
  return {
    addPlayer: id => player.push(id),
    getPlayers: () => player,
    getPlayer: id => player.find(c => c === id),
    getId: () => id
  }
}
module.exports = gameFactory