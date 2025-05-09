
import React from 'react';
import { useApp } from '@/context/AppContext';
import Deck from '@/components/Deck/Deck';

const Home = () => {
  const { getTodayCards } = useApp();
  const todayCards = getTodayCards();
  
  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold mb-2">Accueil</h1>
      <p className="mb-4">Découvre quelque chose de nouveau aujourd'hui</p>
      
      <Deck cards={todayCards} />
    </div>
  );
};

export default Home;
