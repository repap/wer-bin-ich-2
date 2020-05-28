import React, { Fragment } from 'react'
import { PlayerList } from '../../presentations/playerList/PlayerList'

export const Result = () => {
  return (
    <Fragment>
      <h2>Resultate</h2>
      <PlayerList />
      <button>Noch ne Runde!</button>
    </Fragment>
  )
}
