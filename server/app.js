const { join } = require('path')
const { createServer } = require('http')
const express = require('express');
const Socket = require('./services')

const app = express();
const server = createServer(app)
Socket.init(server)

const PORT = process.env.PORT || 4000;

// Single Page App Setup
app.use(express.static(join(__dirname, '..', 'build')));
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'build', 'index.html'));
});

server.listen(PORT, err =>
  err ? console.error(err) : console.log(`App is running on port: ${PORT}`))