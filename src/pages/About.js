import React from 'react';
import Header from '../components/Header';  // Assurez-vous que le chemin est correct
import Footer from '../components/Footer';

function About() {
  return (
    <div>
      <Header />
      <div className="about-content">
        <h1>À propos</h1>
        <p>Cette application est un exemple pour démontrer React Router et la structure des pages.</p>
      </div>
      <Footer />
    </div>
  );
}

export default About;
