import React, { Fragment } from 'react'
import { AppState } from '../app/App';
import { STATES } from '../../const/game';
import { gameStateChangeAction } from '../../actions/game';

export const Login = () => {
  const { dispatch } = React.useContext(AppState);
  const createGame = () => dispatch(gameStateChangeAction(STATES.PLAYER_CREATION))
  return (
    <Fragment>
      <button onClick={createGame}>Ich erstell mal n Spiel</button>
    </Fragment>
  )
}
