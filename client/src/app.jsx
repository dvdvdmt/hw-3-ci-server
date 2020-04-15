import React from 'react';
import './app.scss';
import {useSelector} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router';
import {ProgressSpinner} from './components/progress-spinner/progress-spinner.jsx';
import {BuildDetails} from './features/build-details/build-details.jsx';
import {BuildHistoryPage} from './features/build-history-page/build-history-page.jsx';
import {SettingsPage} from './features/settings-page/settings-page.jsx';
import {settingsSelector} from './store/settings.js';
import {toBuildDetails, toBuildHistory, toSettings} from './utils/router.js';

export function App() {
  const settings = useSelector(settingsSelector);
  const isSpinnerVisible = settings.isLoading;

  return (
    <div className="App">
      {isSpinnerVisible ? <ProgressSpinner data-test="main-progress" /> : <AppRoutes />}
    </div>
  );
}

function AppRoutes() {
  return (
    <Switch>
      <Route path={toSettings()} exact>
        <SettingsPage />
      </Route>
      <Route path={toBuildDetails()} exact>
        <BuildDetails />
      </Route>
      <Route path={toBuildHistory()} exact>
        <BuildHistoryPage />
      </Route>
      <Route>
        <Redirect to={toBuildHistory()} />
      </Route>
    </Switch>
  );
}
