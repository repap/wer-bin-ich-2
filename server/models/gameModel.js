const { v4: uuidv4 } = require('uuid');

class GameModel {
  constructor(id = uuidv4()) {
    this.id = id
    this.players = []
    this.state = null // IN_LOBBY, IN_GAME
  }

  updateState (state) { this.state = state }
  addPlayer (player) { this.players.push(player) }
  removePlayer (player) {
    this.players = this.players.filter(p => p.id !== player.id)
  }
}

module.exports = GameModel