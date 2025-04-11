import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Page from './pages/Page';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes> 
          <Route path="/" element={<Home />} /> 
          <Route path="/page" element={<Page />} /> 
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
