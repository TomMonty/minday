import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Card from '../Card/Card';
import styles from './Deck.module.css';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trophy, Book } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';

const Deck = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [seenCards, setSeenCards] = useState([]);
  const [history, setHistory] = useState([]);
  const [showProgress, setShowProgress] = useState(true);
  const navigate = useNavigate();
  const { saveCard } = useApp();
  const { toast } = useToast();
  
  const handleReject = (id) => {
    setSeenCards(prev => [...prev, id]);
    setHistory(prev => [...prev, currentIndex]);
    setCurrentIndex(prev => prev + 1);
  };
  
  const handleSave = (id) => {
    // Save the card to the library
    saveCard(id);
    
    // Show confirmation toast
    toast({
      title: "Carte sauvegardée",
      description: "La carte a été ajoutée à votre bibliothèque",
      duration: 2000
    });
    
    setSeenCards(prev => [...prev, id]);
    setHistory(prev => [...prev, currentIndex]);
    setCurrentIndex(prev => prev + 1);
  };
  
  const handleMore = (id) => {
    // Store the current state in sessionStorage before navigating
    sessionStorage.setItem('returnToHome', 'true');
    
    // Navigate to card details with category determined by card content
    navigate(`/library/histoire/${id}`);
  };

  const handlePrevious = () => {
    if (history.length > 0) {
      const prevIndex = history[history.length - 1];
      setCurrentIndex(prevIndex);
      setHistory(prev => prev.slice(0, -1));
      setSeenCards(prev => prev.slice(0, -1));
    }
  };
  
  const handleContinueWithChallenge = () => {
    // Reset cards but keep progress tracking
    setCurrentIndex(0);
    setSeenCards([]);
    setHistory([]);
    setShowProgress(true);
  };
  
  const handleContinueWithoutChallenge = () => {
    // Reset cards without progress tracking
    setCurrentIndex(0);
    setSeenCards([]);
    setHistory([]);
    setShowProgress(false);
  };
  
  const progress = showProgress ? (seenCards.length / 5) * 100 : 0;
  
  // Show completed screen if all cards are seen or 5 cards with progress
  if (currentIndex >= cards.length || (showProgress && seenCards.length >= 5)) {
    return (
      <div className={styles.deck__completed}>
        <h2>Tu as fini pour aujourd'hui!</h2>
        <p>Choisis comment continuer</p>
        
        <div className="flex flex-col gap-3 mt-6 w-full max-w-xs">
          <Button 
            onClick={handleContinueWithChallenge}
            className="flex items-center gap-2"
          >
            <Trophy className="w-5 h-5" />
            Continuer avec des challenges
          </Button>
          
          <Button 
            onClick={handleContinueWithoutChallenge}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Book className="w-5 h-5" />
            Explorer plus de cartes
          </Button>
        </div>
      </div>
    );
  }
  
  const currentCard = cards[currentIndex];
  const canGoBack = history.length > 0;
  
  console.log('Current card:', currentCard); // Log de la carte courante
  
  return (
    <div className={styles.deck}>
      {showProgress && (
        <div className={styles.deck__progress}>
          <Progress value={progress} className={styles.deck__progressBar} />
          <span className={styles.deck__progressText}>
            {seenCards.length} / 5
          </span>
        </div>
      )}
      
      <div className={styles.deck__cardContainer}>
        <AnimatePresence mode="wait">
          {currentCard && (
            <Card
              key={currentCard._id || currentCard.id}
              id={currentCard._id || currentCard.id}
              title={currentCard.title}
              subtitle={currentCard.subtitle}
              imageUrl={currentCard.imageUrl}
              onReject={handleReject}
              onSave={handleSave}
              onMore={handleMore}
            />
          )}
        </AnimatePresence>
      </div>
      
      {canGoBack && (
        <button 
          onClick={handlePrevious}
          className={styles.deck__previousButton}
        >
          Carte précédente
        </button>
      )}
    </div>
  );
};

export default Deck;
