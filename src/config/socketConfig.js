const ENDPOINT = process.env.NODE_ENV !== 'production'
  ? `http://localhost:${process.env.REACT_APP_WS_PORT}`
  : window.location.href

const socketConfig = ({
  uri: ENDPOINT,
  reducer: (state, { type, payload }) => {
    console.log(type, payload)
    return {
      ...state,
      ...payload,
    }
  },
  initialState: { game: { gameId: null } },
})

export default socketConfig