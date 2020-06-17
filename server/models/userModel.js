module.exports = socket => {
  const user = {
    id: socket.id,
    name: null,
    alias: null,
    state: null, // PREPARING_NAME, WAITING, PREPARING_ALIAS, PLAYING
    role: null, // PLAYER, SPECTATOR
  }

  return {
    getId: () => user.id,
    setName: value => user.name = value,
    getName: () => user.name,
    setAlias: value => user.alias = value,
    getAlias: () => user.alias,
    setState: value => user.state = value,
    getState: () => user.state,
    setRole: value => user.role = value,
    getRole: () => user.role,
  }
}