import React, { Fragment } from 'react'
import { PlayerList } from '../../presentations/playerList/PlayerList'
import { CopyLink } from '../../presentations/copyLink/CopyLink'
import { CreateAlias } from '../createAlias/CreateAlias'

export const Lobby = () => {
  return (
    <Fragment>
      <h2>Lobby</h2>
      <div>
        Kopiere und teile den Link mit deinen Freunden, damit du mit ihnen spielen kannst!
        <CopyLink link="http://12345.test.test" />
        <h3>Mitspieler</h3>
        <PlayerList />
        <CreateAlias />
        <button>So, kann jetzt losgehen!</button>
      </div>
    </Fragment>
  )
}
