import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './components/Home';
import Game from './components/Game';
import HighScores from './components/HighScores';

import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Route exact path="/" component={Home} />
        <Route path="/highScores" component={HighScores} />
        <Route path="/game" component={Game} />
      </div>
    </Router>
  );
}

export default App;
