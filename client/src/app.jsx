import React from 'react';
import './app.scss';
import {BuildHistory} from './features/build-history/build-history.jsx';

export function App() {
  return (
    <div className="App">
      <BuildHistory />
    </div>
  );
}
