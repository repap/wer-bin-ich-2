import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client'

const ENDPOINT = process.env.NODE_ENV !== 'production'
  ? `http://localhost:${process.env.REACT_APP_WS_PORT}`
  : window.location.href

export const useSocket = () => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT)
    socket.on('update', ({ msg }) => {
      setResponse(msg);
    });

    return () => socket.disconnect()
  }, []);

  return { response }
}