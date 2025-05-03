import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Minday from './pages/Minday';
import Librairie from './pages/Librairie';
import Challenges from './pages/Challenges';
import Profil from './pages/Profil';

function App() {
  return (
    <div className="mobile-wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<Minday />} />
          <Route path="/librairie" element={<Librairie />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
