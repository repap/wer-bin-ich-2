import React from 'react'
import { useSocket } from '../hooks/useSocket'

export const Game = ({gameId}) => {

  const {response} = useSocket()

  return (
    <div>
      Game {gameId}
      <p>
        socket: {response}
      </p>
    </div>
  )
}
