import React, { Fragment } from 'react'
import { PlayerList } from '../../presentations/playerList/PlayerList'
import { CopyLink } from '../../presentations/copyLink/CopyLink'
import { CreateAlias } from '../createAlias/CreateAlias'
import { gameStateChangeAction } from '../../actions/game'
import { AppState } from '../app/App'
import { STATES } from '../../const/game'

export const Lobby = () => {
  const { dispatch } = React.useContext(AppState);
  const startGame = () => dispatch(gameStateChangeAction(STATES.GAME_PLAY))
  return (
    <Fragment>
      <h2>Lobby</h2>
      <div>
        Kopiere und teile den Link mit deinen Freunden, damit du mit ihnen spielen kannst!
        <CopyLink link="http://12345.test.test" />
        <h3>Mitspieler</h3>
        <PlayerList />
        <CreateAlias />
        <button onClick={startGame}>So, kann jetzt losgehen!</button>
      </div>
    </Fragment>
  )
}
