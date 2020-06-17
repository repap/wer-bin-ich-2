const socketio = require('socket.io')
const gameEvents = require('./gameEvents')
const userEvents = require('./userEvents')

module.exports = server => {
  const io = socketio(server)

  io.on('connection', socket => {
    gameEvents(socket)
    userEvents(socket)

    socket.on('disconnect', () => {
    })
  })

}