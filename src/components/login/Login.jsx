import React, { Fragment } from 'react'
import { AppState } from '../app/App';
import { STATES } from '../../const/game';
import { createGameAction } from '../../actions/game';

export const Login = () => {
  const { dispatch } = React.useContext(AppState);
  const createGame = () => dispatch(createGameAction(STATES.PLAYER_CREATION))
  return (
    <Fragment>
      <button onClick={createGame}>Ich erstell mal n Spiel</button>
    </Fragment>
  )
}
