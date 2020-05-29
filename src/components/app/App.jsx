import React, { createContext, useReducer } from 'react';
import './App.css';
import { Default } from '../../layouts/Default';
import { Login } from '../login/Login';
import { CreateOwnPlayer } from '../createOwnPlayer/CreateOwnPlayer';
import { Lobby } from '../lobby/Lobby';
import { Game } from '../game/Game';
import { Result } from '../result/Result';

export const AppState = createContext()
export const ACTION_TYPES = {
  CHANGE_GAME_STATE: 'changeGameState',
}

export const STATES = {
  PLAYER_CREATION: 'playerCreation',
  GAME_CREATION: 'gameCreation',
  GAME_PREPERATION: 'gamePreperation',
  GAME_PLAY: 'gamePlay',
  GAME_END: 'gameEnded',
}

const VIEW_STATE_MAP = {
  [STATES.PLAYER_CREATION]: CreateOwnPlayer,
  [STATES.GAME_CREATION]: Login,
  [STATES.GAME_PREPERATION]: Lobby,
  [STATES.GAME_PLAY]: Game,
  [STATES.GAME_END]: Result,
}

const initialState = {
  gameState: STATES.GAME_CREATION,
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_GAME_STATE:
      return {
        ...state,
        gameState: action.gameState,
      }
    default:
      return state
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const GameStateComponent = VIEW_STATE_MAP[state.gameState]
  return (
    <AppState.Provider
      value={{state, dispatch}}
    >
      <div className="App">
        <Default>
          <GameStateComponent />
        </Default>
      </div>
    </AppState.Provider>
  );
}

export default App;
