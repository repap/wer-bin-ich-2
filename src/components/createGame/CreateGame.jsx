import React, { Fragment } from 'react'

export const CreateGame = () => {
  return (
    <Fragment>
      <h2>Spiel erstellen</h2>
      <form>
        <label htmlFor="gameName">Name des Spiels:</label>
        <input type="text" name="gameName"/>
        <button>Spiel erstellen</button>
      </form>
    </Fragment>
  )
}
