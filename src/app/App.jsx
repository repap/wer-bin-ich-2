import React, {  } from 'react';
import './App.css';
import { BaseLayout } from '../layout/BaseLayout';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { SocketProvider } from 'react-socket-io-hooks';
import Home from '../home/Home';
import Game from '../game/Game';
import socketConfig from '../config/socketConfig';

const App = () => (
  <div className="App">
    <SocketProvider {...socketConfig}>
      <BaseLayout>
        <BrowserRouter>
          <Switch>
            <Route 
              path="/game/:gameId"
              render={props => (
                <Game {...props.match.params} />
              )}
            >
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </BaseLayout>
    </SocketProvider>
  </div>
)

export default App;
