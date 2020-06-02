const state = {
  id: null,
  gameId: null,
  aliasPlayer: null,
}

const socket = io()
const gameId = window.location.href.split('/').pop()

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

socket.on('init', () => {
  
})

socket.on('updateGame', ({ id, gameId, players, gameState }) => {
  state.id = id
  state.gameId = gameId
  
  hideElementById('spectatorlist')
  if (gameState === 'running') {
    const spectators = players.filter(p => !p.isReady)
    updateList(gameState, players.filter(p => p.isReady), 'playerlist', 'Mitspieler')
    
    if (spectators.length) {
      showElementById('spectatorlist')
      updateList(gameState, spectators, 'spectatorlist', 'Zuschauer')
    }
  }
  if (gameState === 'preperation') {
    updateList(gameState, players, 'playerlist', 'Mitspieler')
    resetElementByid('setRestartGame')
    setReady(id, gameId)
  }
})

socket.on('createName', () => {
  setName()
})

socket.on('createAlias', ({ requestAlias, players }) => {
  state.aliasId = requestAlias
  setAlias(players.find(p => p.id === requestAlias))
  setRestartGame()
  resetElementByid('setReadyToPlay')
})

const resetElementByid = id => {
  document.querySelector(`#${id} input[type=checkbox]`).checked = false;
  document.getElementById(id).classList.add('not-checked')
  hideElementById(id)
}

const hideElementById = id => document.getElementById(id).classList.add('hidden')

const showElementById = id => document.getElementById(id)
  .classList.remove('hidden')

const createAliasLabel = alias => alias
  ? `<span class="alias">${alias}</span>`
  : ''

const createIsReadyLabel = isReady => isReady
  ? `<span class="isReady status">kann los gehen</span>`
  : ''

const createIsRestartRequestedLabel = isRestartRequested => isRestartRequested
  ? `<span class="isRestartRequested status">bereit für noch ne Runde</span>`
  : ''

const createPlayerStatusLabel = (gameState, { isReady, isRestartRequested}) => {
  switch (gameState) {
    case 'preperation': return createIsReadyLabel(isReady)
    case 'running': return createIsRestartRequestedLabel(isRestartRequested)
    default: return ''
  }
}

const updateList = (gameState, players, id, header) => {
  const list = document.getElementById(id)
  list.innerHTML = `<h2>${header}</h2>`

  players.forEach(p => {
    const playerElement = document.createElement('div')
    playerElement.innerHTML = `
      <img src="https://api.adorable.io/avatars/55/${p.id}@adorable.png">
      <div>
        <div>
          <div class="player">
            ${p.name || 'unbekannter Spieler'}
          </div>
          ${createAliasLabel(p.alias)}
        </div>
        ${createPlayerStatusLabel(gameState, p)}
      </div>
    `
    list.append(playerElement)
  });
}

const closeModal = e => {
  e.preventDefault()
  modal.remove()
}

const sendSetName = e => {
  e.preventDefault()
  socket.emit('setName', {
    name: document.getElementById('setNameInput').value,
    id: state.id,
    gameId: state.gameId,
  })
  document.querySelectorAll('.modal').forEach(e => e.classList.add('hidden'))
}

const sendSetAlias = e => {
  e.preventDefault()
  socket.emit('setAlias', {
    alias: document.getElementById('setAliasInput').value,
    aliasId: state.aliasId,
    id: state.id,
    gameId: state.gameId,
  })
  document.querySelectorAll('.modal').forEach(e => e.classList.add('hidden'))
}

const setAlias = aliasPlayer => {
  const modal = document.getElementById('setAliasModal')
  document.querySelector('#setAliasModal h2').innerHTML=`Wer ist ${aliasPlayer.name}?!?`
  modal.classList.remove('hidden')

  document.querySelector('#setAliasModal button.send').removeEventListener('click', sendSetAlias)
  document.querySelector('#setAliasModal button.send').addEventListener(
    'click',
    sendSetAlias,
  )
}

const setName = () => {
  const modal = document.getElementById('setNameModal')
  modal.classList.remove('hidden')

  document.querySelector('#setNameModal button.send').removeEventListener('click', sendSetName)
  document.querySelector('#setNameModal button.send').addEventListener(
    'click',
    sendSetName,
  )
}

const sendSetReady = () => {
  const checkbox = document.querySelector('#setReadyToPlay input')
  const checkedChecker = document.querySelector('#setReadyToPlay')

  checkbox.checked = !checkbox.checked

  !checkbox.checked 
    ? checkedChecker.classList.add('not-checked') 
    : checkedChecker.classList.remove('not-checked')

  socket.emit('setReady', {
    isReady: checkbox.checked,
    id: state.id,
    gameId: state.gameId,
  })
}

const setReady = () => {
  const setReadyToPlayElement = document.getElementById('setReadyToPlay')
  setReadyToPlayElement.classList.remove('hidden')

  setReadyToPlayElement.removeEventListener('click', sendSetReady)
  setReadyToPlayElement.addEventListener(
    'click',
    sendSetReady,
  )
}

const sendSetRestartGame = () => {
  const checkbox = document.querySelector('#setRestartGame input')
  const checkedChecker = document.querySelector('#setRestartGame')
  
  checkbox.checked = !checkbox.checked

  !checkbox.checked
    ? checkedChecker.classList.add('not-checked')
    : checkedChecker.classList.remove('not-checked')

  socket.emit('restart', {
    isRestartRequested: checkbox.checked,
    id: state.id,
    gameId: state.gameId,
  })
}

const setRestartGame = () => {
  const setRestartGameElement = document.getElementById('setRestartGame')
  setRestartGameElement.classList.remove('hidden')

  setRestartGameElement.removeEventListener('click', sendSetRestartGame)
  setRestartGameElement.addEventListener(
    'click',
    sendSetRestartGame,
  )
}

