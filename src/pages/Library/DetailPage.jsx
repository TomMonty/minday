import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Share2 } from 'lucide-react';
import styles from './DetailPage.module.css';
import { useApp } from '@/context/AppContext';
import { ScrollArea } from '@/components/ui/scroll-area';

const DetailPage = () => {
  const { id, cat } = useParams();
  const { state, saveCard } = useApp();
  const { cards } = state;
  const navigate = useNavigate();
  
  // Determine if we should return to home page
  const returnToHome = sessionStorage.getItem('returnToHome') === 'true';
  
  // Clear the flag after checking it
  useEffect(() => {
    if (returnToHome) {
      sessionStorage.removeItem('returnToHome');
    }
  }, [returnToHome]);
  
  // Find the card matching the ID
  const article = cards.find(card => card.id === id);
  
  const handleSaveCard = () => {
    if (id) {
      saveCard(id);
    }
  };
  
  const handleChallenge = () => {
    navigate(`/challenges/lobby?cardId=${id}`);
  };
  
  const handleBack = () => {
    if (returnToHome) {
      navigate('/home');
    } else {
      navigate(`/library/${cat}`);
    }
  };
  
  if (!article) {
    return <div className={styles.notFound}>Article non trouvé</div>;
  }
  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Button variant="ghost" size="sm" className={styles.backButton} onClick={handleBack}>
          <ChevronLeft className="w-5 h-5" />
          Retour
        </Button>
      </header>
      
      <ScrollArea className={styles.scrollArea}>
        <div className={styles.articleContainer}>
          <h1 className={styles.title}>{article.title}</h1>
          
          <div className={styles.imageContainer}>
            <img src={article.image} alt={article.title} className={styles.image} />
          </div>
          
          <div className={styles.content}>
            <p className={styles.subtitle}>{article.subtitle}</p>
            
            <p className={styles.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, 
              nisl vel tincidunt lacinia, nunc est congue nunc, vel aliquam nunc 
              nisl sit amet nunc. Sed euismod, nisl vel tincidunt lacinia, nunc est 
              congue nunc, vel aliquam nunc nisl sit amet nunc.
            </p>
            
            <p className={styles.paragraph}>
              Sed euismod, nisl vel tincidunt lacinia, nunc est congue nunc, 
              vel aliquam nunc nisl sit amet nunc. Sed euismod, nisl vel tincidunt 
              lacinia, nunc est congue nunc, vel aliquam nunc nisl sit amet nunc.
            </p>
          </div>
        </div>
      </ScrollArea>
      
      <div className={styles.actions}>
        <Button className={styles.challengeButton} onClick={handleChallenge}>
          Challenger quelqu'un
        </Button>
        
        <Button variant="outline" size="icon" className={styles.shareButton}>
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default DetailPage;
