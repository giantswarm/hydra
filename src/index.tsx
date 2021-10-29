import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Auth from './Auth';
import Home from './Home';
import Settings from './Settings';
import reportWebVitals from './reportWebVitals';
import EndpointManager from './auth/endpointManager';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const em = new EndpointManager('fFlz7lckhWA0kIaW3fLIl8chFSs2wvW6');

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App>
        <Route path="/" exact><Home /></Route>
        <Route path="/auth/" exact><Auth endpointManager={em} /></Route>
        <Route path="/settings/" exact><Settings endpointManager={em} /></Route>
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
