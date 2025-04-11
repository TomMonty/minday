import React from 'react';
import Header from '../components/Header';  // Assurez-vous que le chemin est correct
import Footer from '../components/Footer';

function Home() {
  return (
    <div>
      <Header />
      <div className="home-content">
        <h1>Page d'Accueil</h1>
        <p>Bienvenue sur la page d'accueil de l'application.</p>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
