const socket = io()

const gameId = window.location.href.split('/').pop()
console.log(gameId)

socket.on('connect', () => {
  if (socket.connected) {
    socket.emit('joinGame', { gameId })
  }
})

socket.on('disconnect', () => {
  if (socket.disconnected) {
    window.location.reload()
  }
})

socket.on('updateGame', ({ players, id, gameId }) => {
  console.log('updateGame', players)
  updatePlayerList(players)
})

socket.on('createName', ({ id, gameId, gameState }) => {
  setName(id, gameId)
  if (gameState === 'preperation') {
    setReady(id, gameId)
  }
})

socket.on('createAlias', ({ id, gameId, requestAlias }) => {
  console.log('createAlias', requestAlias)
  setAlias(id, gameId, requestAlias)
  removeSetReady()
})

const removeSetReady = () => document.getElementById('readyToPlay')
  .classList.add('hidden')

const updatePlayerList = players => {
  const playerlist = document.getElementById('playerlist')
  playerlist.innerHTML = '<h2>Mitspieler</h2>'

  players.forEach(p => {
    const playerElement = document.createElement('div')
    playerElement.innerHTML = `
      <div>
        <div>
          <img src="https://api.adorable.io/avatars/40/${p.id}@adorable.png">
        </div>
        <div>
          ${p.name || 'unbekannter Spieler'} <br />
          ${p.alias ? 'aka ' + p.alias : ''}
        </div>
      </div>
    `
    playerlist.append(playerElement)
  });
}

const createModal = content => {
  const modal = document.createElement('div')
  modal.classList.add('modal')
  modal.innerHTML = `
    <button id="modal-close">schließen</button>
  `

  modal.append(content(modal.remove))
  document.body.prepend(modal)
  
  document.getElementById('modal-close').addEventListener(
    'click',
    e => {
      e.preventDefault()
      modal.remove()
    }
  )
}

const sendSetName = (id, gameId, modal) => e => {
  e.preventDefault()
  socket.emit('setName', {
    name: document.getElementById('setNameInput').value,
    id,
    gameId,
  })
  modal.classList.add('hidden')
}

const sendSetAlias = (id, gameId, aliasId, modal) => e => {
  e.preventDefault()
  socket.emit('setAlias', {
    alias: document.getElementById('setAliasInput').value,
    id,
    aliasId,
    gameId,
  })
  modal.classList.add('hidden')
}

const setAlias = (id, gameId, aliasId) => {
  console.log('setAlias')
  const modal = document.getElementById('setAliasModal')
  modal.classList.remove('hidden')
  document.querySelector('#setAliasModal button.send').addEventListener(
    'click',
    sendSetAlias(id, gameId, aliasId, modal)
  )
}

const setName = (id, gameId) => {
  const modal = document.getElementById('setNameModal')
  modal.classList.remove('hidden')
  document.querySelector('#setNameModal button.send').addEventListener(
    'click',
    sendSetName(id, gameId, modal)
  )
}

const setReady = (id, gameId) => {
  const readyToPlayElement = document.getElementById('readyToPlay')
  readyToPlayElement.classList.remove('hidden')
  readyToPlayElement.addEventListener(
    'click',
    e => {
      const checkbox = document.querySelector('#readyToPlay input')
      checkbox.checked = !checkbox.checked
      socket.emit('setReady', {
        isReady: checkbox.checked,
        id,
        gameId,
      })
    })
}