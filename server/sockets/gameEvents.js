const GameService = require('../services/gameService')

module.exports = socket => {
  const gameService = new GameService(socket)

  socket.on('game/join', gameService.join)
  socket.on('game/leave', gameService.leave)
  socket.on('game/restart', gameService.restart)
  socket.on('game/ready', gameService.ready)
  socket.on('game/create', gameService.create)
}