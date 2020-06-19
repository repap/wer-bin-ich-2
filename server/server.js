const { join } = require('path')
const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connect', socket => {
  console.log('connection', socket.id)
  socket.emit('update', 'Hello World :)')
  socket.on('createGame', () => {
    socket.emit('gameCreated', { game: { gameId: '123456' }})
  })
})

const PORT = process.env.PORT || 4000;

// Single Page App Setup
app.use(express.static(join(__dirname, '..', 'build')));
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'build', 'index.html'));
});

server.listen(PORT, err =>
  err ? console.error(err) : console.log(`App is running on port: ${PORT}`))