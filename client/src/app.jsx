import React, {useEffect, useState} from 'react';
import './app.scss';
import {Redirect, Route, Switch} from 'react-router';
import {toBuildDetails, toBuildHistory, toSettings} from './utils/router.js';
import {BuildHistory} from './features/build-history/build-history.jsx';
import {Settings} from './features/settings/settings.jsx';
import {BuildDetails} from './features/build-details/build-details.jsx';
import {ProgressSpinner} from './components/progress-spinner/progress-spinner.jsx';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="App">
      {isLoading ? <ProgressSpinner data-test="main-progress" /> : <AppRoutes />}
    </div>
  );
}

function AppRoutes() {
  return (
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
  );
}
