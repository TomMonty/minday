import React from 'react';
import Header from '../components/Header';  // Assurez-vous que le chemin est correct
import Footer from '../components/Footer';

function Page() {
  return (
    <div>
      <Header />
      <div className="page-content">
        <h1>Bienvenue sur la Page</h1>
        <p>Ceci est un modèle de page. Vous pouvez ajouter plus de contenu ici.</p>
      </div>
      <Footer />
    </div>
  );
}

export default Page;
