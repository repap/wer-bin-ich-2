import React, { createContext, useReducer } from 'react';
import './App.css';
import { Default } from '../../layouts/Default';
import { Login } from '../login/Login';
import { CreateOwnPlayer } from '../createOwnPlayer/CreateOwnPlayer';
import { Lobby } from '../lobby/Lobby';
import { Game } from '../game/Game';
import { Result } from '../result/Result';
import { STATES } from '../../const/game';
import { CHANGE_GAME_STATE } from '../../actions/actionTypes';

export const AppState = createContext()

const VIEW_STATE_MAP = {
  [STATES.PLAYER_CREATION]: CreateOwnPlayer,
  [STATES.GAME_CREATION]: Login,
  [STATES.GAME_PREPERATION]: Lobby,
  [STATES.GAME_PLAY]: Game,
  [STATES.GAME_END]: Result,
}

// Alle Datenkommen vom Socket. Nur gameState ist ein hybrid
// Oder soll ich einen guiState implementieren?
// Könnte Sinn machen. Hybride sind selten gut.
const initialState = {
  gameState: STATES.GAME_CREATION,
  guiState: '',
  isHost: false,
  name: 'Dennis', // ist zwar redundant, aber auch einfacher zu nutzen
  playerId: 'p-0123456789',
  gameId: 'g-0123456789', // brauch ich die? Ja, da das der Socket Channel ist
  players: [
    {
      name: 'Dennis',
      playerId: 'p-0123456789',
      rank: '1', // nur relevant wenn spiel vorbei
    },
    {
      name: 'Mareike',
      playerId: 'p-1234567890',
      alias: 'Einstein',
      rank: '0', // nur relevant wenn spiel vorbei
    }
  ]
}

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_GAME_STATE:
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
