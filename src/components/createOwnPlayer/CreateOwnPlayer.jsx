import React, { Fragment } from 'react'

export const CreateOwnPlayer = () => {
  return (
    <Fragment>
      <h2>Spieler</h2>
      <form>
        <label htmlFor="playerName">Ich heiße: </label>
        <input type="text" name="playerName"/>
        <button>Jo, so heiße ich!</button>
      </form>
    </Fragment>
  )
}
