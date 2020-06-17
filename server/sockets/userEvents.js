const UserService = require('../services/userService')

module.exports = socket => {
  const userService = new UserService(socket)

  socket.on('user/setName', userService.setName)
  socket.on('user/setAlias', userService.setAlias)
}