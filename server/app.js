const { join } = require('path')
const { createServer } = require('http')
const socketio = require('socket.io')
const express = require('express');

const app = express();
const server = createServer(app)
const io = socketio(server)

const PORT = process.env.PORT || 4000;

console.log(join(__dirname, '..', 'build/'))

app.use(express.static(join(__dirname, '..', 'build')));

app.use('/api', require('./api/gameRoute'))

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'build', 'index.html'));
});

server.listen(PORT, err =>
  err ? console.error(err) : console.log(`App is running on port: ${PORT}`))