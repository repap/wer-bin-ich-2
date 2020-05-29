import React, { Fragment } from 'react'
import { AppState, STATES, ACTION_TYPES } from '../app/App';

const createGameAction = () => ({
  type: ACTION_TYPES.CHANGE_GAME_STATE,
  gameState: STATES.PLAYER_CREATION,
})

export const Login = () => {
  const { dispatch } = React.useContext(AppState);
  const createGame = () => dispatch(createGameAction())
  return (
    <Fragment>
      <button onClick={createGame}>Ich erstell mal n Spiel</button>
    </Fragment>
  )
}
