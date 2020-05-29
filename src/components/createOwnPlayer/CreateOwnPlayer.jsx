import React, { Fragment } from 'react'
import { AppState } from '../app/App';
import { STATES } from '../../const/game';
import { gameStateChangeAction } from '../../actions/game';

export const CreateOwnPlayer = () => {
  const { dispatch } = React.useContext(AppState);
  const createPlayer = () => dispatch(gameStateChangeAction(STATES.GAME_PREPERATION))
  return (
    <Fragment>
      <h2>Spieler</h2>
      <form onSubmit={e => {
        e.preventDefault()
        createPlayer()
      }}>
        <label htmlFor="playerName">Ich heiße: </label>
        <input type="text" name="playerName"/>
        <button>Jo, so heiße ich!</button>
      </form>
    </Fragment>
  )
}
