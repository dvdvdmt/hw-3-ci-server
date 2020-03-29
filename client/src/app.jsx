import React from 'react';
import './app.scss';
import {Redirect, Route, Switch} from 'react-router';
import {toBuildHistory} from './utils/router.js';
import {BuildHistory} from './features/build-history/build-history.jsx';

export function App() {
  return (
    <div className="App">
      <Switch>
        <Route path={toBuildHistory()} exact>
          <BuildHistory />
        </Route>
        <Route>
          <Redirect to={toBuildHistory()} />
        </Route>
      </Switch>
    </div>
  );
}
