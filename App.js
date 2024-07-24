// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import PnrStatus from './components/PnrStatus';
import TrainStatus from './components/TrainStatus';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/pnr-status" element={<PnrStatus />} />
          <Route path="/train-status" element={<TrainStatus />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
