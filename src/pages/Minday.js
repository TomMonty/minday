import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import cardsData from '../data/cards';

function Home() {
  const [cards, setCards] = useState(cardsData);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSkip = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handleSave = () => {
    console.log(`Carte sauvegardée : ${cards[currentIndex].id}`);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleInfo = () => {
    alert(`Plus d’infos sur : ${cards[currentIndex].title}`);
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="mobile-wrapper" style={{ paddingBottom: "60px" }}>
      <div className="page-content">
        {currentIndex >= cards.length ? (
          <div style={{ textAlign: "center", marginTop: "100px" }}>
            <img src="/images/crocodile.png" alt="crocodile" style={{ width: 100 }} />
            <h2>Tu as fini pour aujourd’hui !</h2>
            <button>Challenge suivant</button><br />
            <button>Revoir les sauvegardes</button>
          </div>
        ) : (
          <div className="card-transition">
            <Card
              card={currentCard}
              onSkip={handleSkip}
              onSave={handleSave}
              onInfo={handleInfo}
            />
          </div>
        )}
      </div>
      <Navbar active="minday" />
    </div>
  );
}

export default Home;
