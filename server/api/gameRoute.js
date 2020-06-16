const express = require('express')
const router = express.Router()

router.get('/game/create', (req, res) => {
  // ...
  res.send('create game')
})

// router.get('/game/:id?', (req, res) => {
//   // ...
//   res.send('game')
// })

module.exports = router