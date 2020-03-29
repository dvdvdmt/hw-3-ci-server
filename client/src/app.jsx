import React from 'react';
import './app.scss';
import {Redirect, Route, Switch} from 'react-router';
import {toBuildDetails, toBuildHistory, toSettings} from './utils/router.js';
import {BuildHistory} from './features/build-history/build-history.jsx';
import {Settings} from './features/settings/settings.jsx';
import {BuildDetails} from './features/build-details/build-details.jsx';

export function App() {
  return (
    <div className="App">
      <Switch>
        <Route path={toSettings()} exact>
          <Settings />
        </Route>
        <Route path={toBuildDetails()} exact>
          <BuildDetails />
        </Route>
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
