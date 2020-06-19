import React from 'react'
import { useSocket } from '../hooks/useSocket'

export const Home = () => {

  const {response} = useSocket()

  return (
    <div>
      Home
      <p>
        socket: {response}
      </p>
    </div>
  )
}
