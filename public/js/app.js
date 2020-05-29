const socket = io()

const gameId = window.location.href.split('/').pop()
console.log(gameId)

socket.on('connect', () => {
  if (socket.connected) {
    console.log('connect')
    socket.emit('joinGame', { gameId })
  }
})

socket.on('disconnect', () => {
  if (socket.disconnected) {
    console.log('disconnected')
    window.location.reload()
  }
})

socket.on('gameData', data => {
  const { players, id, gameId } = data
  updatePlayerList(players)
  updateSetName(players.find(p => p.id === id), gameId)
})

const updatePlayerList = players => {
  const playerlist = document.getElementById('playerlist')
  playerlist.innerHTML = '<h2>Mitspieler</h2>'

  players.forEach(p => {
    const playerElement = document.createElement('div')
    playerElement.innerHTML = `
      <div>
        ${p.name || p.id}
      </div>
    `
    playerlist.append(playerElement)
  });
}

const updateSetName = (player, gameId) => {
  if (player.name) {
    const setNameElement = document.getElementById('setName')
    return setNameElement.innerHTML = ''
  }

  document.querySelector('#setName button').addEventListener(
    'click',
    e => {
      e.preventDefault()
      socket.emit('setName', {
        name: document.getElementById('setNameInput').value,
        id: player.id,
        gameId,
      })
      return false
    }
  )
}