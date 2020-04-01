import React, {useEffect} from 'react';
import './app.scss';
import {Redirect, Route, Switch} from 'react-router';
import {toBuildDetails, toBuildHistory, toSettings} from './utils/router.js';
import {BuildHistoryPage} from './features/build-history-page/build-history-page.jsx';
import {Settings} from './features/settings/settings.jsx';
import {BuildDetails} from './features/build-details/build-details.jsx';
import {ProgressSpinner} from './components/progress-spinner/progress-spinner.jsx';
import {useDispatch, useSelector} from 'react-redux';
import {loadSettings, settingsSelector} from './store/settings.js';

export function App() {
  const settings = useSelector(settingsSelector);
  const isSpinnerVisible = settings.isFirstLoading || settings.isLoading;
  const dispatch = useDispatch();
  console.log('settings', settings);
  useEffect(() => {
    dispatch(loadSettings());
  }, []);

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
        <Settings />
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
