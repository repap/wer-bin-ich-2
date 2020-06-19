import React, { useEffect } from 'react'
import { useEmitEvent, useSocketSelector } from 'react-socket-io-hooks';
import { withRouter } from 'react-router-dom';

const Home = ({ history }) => {
  const gameId = useSocketSelector(state => state?.game?.gameId);
  const createGame = useEmitEvent('createGame')

  useEffect(() => {
    if (gameId) {
      history.push(`/game/${gameId}`)
    }
  }, [history, gameId])

  return (
    <div>
      Home
      <p>
        socket: {gameId}
      </p>
      <button onClick={() => createGame()}>send what</button>
    </div>
  )
}

export default withRouter(Home)