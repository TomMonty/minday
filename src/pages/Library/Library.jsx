
import React from 'react';
import CategoryGrid from '@/components/CategoryGrid/CategoryGrid';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Library = () => {
  const { state } = useApp();
  const { categories, cards } = state;
  const navigate = useNavigate();
  
  // Check if the user has explicitly saved any cards
  const hasSavedCards = cards.some(card => card.savedAt);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Votre Bibliothèque</h1>
      
      {!hasSavedCards ? (
        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-100 p-4 rounded-full">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-lg font-medium mb-2">Votre bibliothèque est vide</h2>
          <p className="text-muted-foreground mb-6">
            Découvrez des cartes dans l'accueil et sauvegardez-les pour les ajouter à votre bibliothèque
          </p>
          <Button onClick={() => navigate('/home')}>
            Découvrir des cartes
          </Button>
        </div>
      ) : (
        <CategoryGrid categories={categories} />
      )}
    </div>
  );
};

export default Library;
