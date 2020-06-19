import React, {  } from 'react';
import './App.css';
import { BaseLayout } from '../layout/BaseLayout';
import { Game } from '../game/Game';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Home } from '../home/Home';


const App = () => (
  <div className="App">
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
  </div>
)

export default App;
