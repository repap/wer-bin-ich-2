const createUserService = require('./userService')
const createStore = require('../createStore')

const mockSocket = {
  id: '1234'
}

describe('userService', () => {
  let store
  let userService

  beforeAll(() => {
    store = {
      games: createStore(),
      users: createStore(),
    }

    userService = createUserService(store)(mockSocket)
  })
  it('creates and returns a user', () => {
    const user = userService.create()
    expect(user).toBeTruthy()
    expect(user.getId()).toBe(mockSocket.id)
  })

  it('sets the name of a user', () => {
    const userName = 'TEST_NAME'
    userService.create()
    const name = userService.setName({ id: mockSocket.id, name: userName })
    expect(name).not.toBeNull()
    expect(name).toBe(userName)
  })

  it('sets the alias of a user', () => {
    const userAlias = 'TEST_ALIAS'
    userService.create()
    const alias = userService.setAlias({ id: mockSocket.id, alias: userAlias })
    expect(alias).not.toBeNull()
    expect(alias).toBe(userAlias)
  })
})