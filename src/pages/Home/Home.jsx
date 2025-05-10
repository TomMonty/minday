
import React from 'react';
import { useApp } from '@/context/AppContext';
import Deck from '@/components/Deck/Deck';

const Home = () => {
  const { getTodayCards } = useApp();
  const todayCards = getTodayCards();
  
  return (
    <div className="h-full">
      
      <Deck cards={todayCards} />
    </div>
  );
};

export default Home;
