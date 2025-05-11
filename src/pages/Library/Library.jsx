import React from 'react';
import CategoryGrid from '@/components/CategoryGrid/CategoryGrid';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Library.module.css';

const Library = () => {
  const { state } = useApp();
  const { savedCards } = state;
  const navigate = useNavigate();
  
  // Check if the user has any saved cards
  const hasSavedCards = savedCards.length > 0;

  console.log('État dans Library:', state);
  console.log('Catégories:', state.categories);
  console.log('Cartes sauvegardées:', state.savedCards);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Votre Bibliothèque</h1>
      
      {!hasSavedCards ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h2 className={styles.emptyStateTitle}>Votre bibliothèque est vide</h2>
          <p className={styles.emptyStateDescription}>
            Découvrez des cartes dans l'accueil et sauvegardez-les pour les ajouter à votre bibliothèque
          </p>
          <Button onClick={() => navigate('/home')}>
            Découvrir des cartes
          </Button>
        </div>
      ) : (
        <CategoryGrid />
      )}
    </div>
  );
};

export default Library;
