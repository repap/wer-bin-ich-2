import React, { Fragment } from 'react'
import { PlayerList } from '../../presentations/playerList/PlayerList'
import { CopyLink } from '../../presentations/copyLink/CopyLink'

export const Lobby = () => {
  return (
    <Fragment>
      <h2>Lobby</h2>
      <div>
        <PlayerList />
        Kopiere und teile den Link mit deinen Freunden, damit sie mitspielen können!
        <CopyLink link="http://12345.test.test" />
        <button>So, kann jetzt losgehen!</button>
      </div>
    </Fragment>
  )
}
