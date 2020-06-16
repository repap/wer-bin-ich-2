const GameModel = require('./gameModel')
describe('gameModel', () => {
  const player1 = { id: 1 }
  const player2 = { id: 2 }
  const state1 = 'state1'
  const state2 = 'state2'

  let gameModel

  beforeEach(() => {
    gameModel = new GameModel()
  })

  it('has an id', () => {
    expect(gameModel.id).toBeTruthy()
  })

  it('adds and removes players', () => {
    gameModel.addPlayer(player1)
    expect(gameModel.players).toHaveLength(1)
    gameModel.addPlayer(player2)
    expect(gameModel.players).toHaveLength(2)
    gameModel.removePlayer(player1)
    expect(gameModel.players).toHaveLength(1)
    expect(gameModel.players[0]).toEqual(player2)
  })

  it('updates state', () => {
    gameModel.updateState(state1)
    expect(gameModel.state).toBe(state1)
    gameModel.updateState(state2)
    expect(gameModel.state).toBe(state2)
  })
})