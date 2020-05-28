import React from 'react';
import './App.css';
import { Default } from '../../layouts/Default';
import { Login } from '../login/Login';
import { CreateOwnPlayer } from '../createOwnPlayer/CreateOwnPlayer';
import { Lobby } from '../lobby/Lobby';
import { Game } from '../game/Game';
import { Result } from '../result/Result';

const App = () => {
  return (
    <div className="App">
      <Default>
        <Login />
        <CreateOwnPlayer />
        <Lobby />
        <Game />
        <Game activePlayer />
        <Result />
      </Default>
    </div>
  );
}

export default App;
