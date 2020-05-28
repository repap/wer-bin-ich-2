import React, { Fragment } from 'react'

export const Player = ({name, id, alias}) => {
  return (
    <div className="player">
      <img src={`https://api.adorable.io/avatars/32/${id || Math.random()}@adorable.png`} alt="avatar"/>
      <span>{name}</span> {alias && <Fragment>aka< span > {alias}</span></Fragment>}
    </div>
  )
}
