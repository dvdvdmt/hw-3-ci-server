import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {App} from './app.jsx';
import './styles/index.scss';

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app-root')
);

if (module.hot) {
  module.hot.accept('./app', () => {
    // eslint-disable-next-line global-require,@typescript-eslint/no-var-requires
    const {App: NewApp} = require('./app');
    render(
      <Router>
        <NewApp />
      </Router>,
      document.getElementById('app-root')
    );
  });
}
