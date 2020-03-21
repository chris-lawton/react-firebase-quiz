import React from 'react';
import './App.css';
import Home from './components/Home';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Game from './components/Game';
import HighScores from './components/HighScores';

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
