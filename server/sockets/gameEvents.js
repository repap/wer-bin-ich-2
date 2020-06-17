const { gameService } = require('../services')

module.exports = socket => {
  const service = gameService(socket)

  socket.on('game/join', service.join)
  socket.on('game/leave', service.leave)
  socket.on('game/restart', service.restart)
  socket.on('game/ready', service.ready)
  socket.on('game/create', service.create)
}