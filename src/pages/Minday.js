import React from 'react';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <div style={{ paddingBottom: "60px" }}>
      <h1>Page d'accueil - Minday</h1>
      <p>Bienvenue sur la page Minday.</p>
      <Navbar active="minday" />
    </div>
  );
}

export default Home;
