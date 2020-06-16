const UserModel = require('./userModel')

const socketMock = {
  id: 1,
}

const mockName = 'test';
const mockAlias = 'test-alias';
const mockRole = 'test-role';
const mockState = 'test-state';

describe('userModel', () => {
  let userModel

  beforeEach(() => {
    userModel = new UserModel(socketMock)
  })

  it('has an id', () => {
    expect(userModel.id).toBeTruthy()
  })

  it('updates the name', () => {
    expect(userModel.name).toBeNull()
    userModel.updateName(mockName)
    expect(userModel.name).toBe(mockName)
  })

  it('updates the alias', () => {
    expect(userModel.alias).toBeNull()
    userModel.updateAlias(mockAlias)
    expect(userModel.alias).toBe(mockAlias)
  })

  it('updates the state', () => {
    expect(userModel.state).toBeNull()
    userModel.updateState(mockState)
    expect(userModel.state).toBe(mockState)
  })

  it('updates the role', () => {
    expect(userModel.role).toBeNull()
    userModel.updateRole(mockRole)
    expect(userModel.role).toBe(mockRole)
  })
})