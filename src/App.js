import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Minday from './pages/Minday';
import Librairie from './pages/Librairie';
import Challenges from './pages/Challenges';
import Profil from './pages/Profil';

import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

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
