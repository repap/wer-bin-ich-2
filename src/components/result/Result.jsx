import React, { Fragment } from 'react'
import { PlayerList } from '../../presentations/playerList/PlayerList'
import { gameStateChangeAction } from '../../actions/game';
import { STATES } from '../../const/game';
import { AppState } from '../app/App';

export const Result = () => {
  const { dispatch } = React.useContext(AppState);
  const startGame = () => dispatch(gameStateChangeAction(STATES.GAME_PREPERATION))
  return (
    <Fragment>
      <h2>Resultate</h2>
      <PlayerList />
      <button onClick={startGame}>Noch ne Runde!</button>
    </Fragment>
  )
}
