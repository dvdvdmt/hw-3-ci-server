import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {App} from './app.jsx';
import './styles/index.scss';
import {Provider} from 'react-redux';
import {store} from './store';

function AppRoot({children}) {
  return (
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  );
}

render(
  <AppRoot>
    <App />
  </AppRoot>,
  document.getElementById('app-root')
);

if (module.hot) {
  module.hot.accept('./app', () => {
    // eslint-disable-next-line global-require,@typescript-eslint/no-var-requires
    const {App: NewApp} = require('./app');
    render(
      <AppRoot>
        <NewApp />
      </AppRoot>,
      document.getElementById('app-root')
    );
  });
}
