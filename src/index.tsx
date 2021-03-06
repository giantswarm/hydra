import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Auth from './Auth';
import Home from './Home';
import Settings from './Settings';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App>
        <Route path="/" exact component={Home} />
        <Route path="/auth/" exact component={Auth} />
        <Route path="/settings/" exact component={Settings} />
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
