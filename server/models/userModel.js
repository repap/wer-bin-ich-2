class UserModel {
  constructor (socket) {
    this.id = socket.id
    this.name = null
    this.alias = null
    this.state = null // PREPARING_NAME, WAITING, PREPARING_ALIAS, PLAYING
    this.role = null // PLAYER, SPECTATOR
  }

  updateName (name) { this.name = name }
  updateAlias (alias) { this.alias = alias }
  updateState (state) { this.state = state }
  updateRole (role) { this.role = role }
}

module.exports = UserModel