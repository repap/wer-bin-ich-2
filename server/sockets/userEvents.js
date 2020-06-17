const { userService } = require('../services/userService')

module.exports = socket => {
  const service = new userService(socket)

  socket.on('user/setName', service.setName)
  socket.on('user/setAlias', service.setAlias)
  socket.on('user/create', service.create)
}