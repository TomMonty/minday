import { useState, useEffect } from 'react';
import { format, isSameDay, isYesterday } from 'date-fns';
import { useApp } from '@/context/AppContext';

export const useStreak = () => {
  const { userProfile } = useApp();
  const [streakData, setStreakData] = useState({
    count: 0,
    lastUpdated: null,
    cardsCompleted: 0
  });
  
  useEffect(() => {
    // Load streak data from localStorage on init
    const storedData = localStorage.getItem('min-day-streak');
    
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      
      // Check if streak should be reset (user didn't visit yesterday)
      if (parsedData.lastUpdated) {
        const lastDate = new Date(parsedData.lastUpdated);
        const today = new Date();
        
        if (isSameDay(lastDate, today)) {
          // Same day, keep streak
          setStreakData(parsedData);
        } else if (isYesterday(lastDate)) {
          // Yesterday, keep streak but reset cards completed
          setStreakData({
            ...parsedData,
            cardsCompleted: 0
          });
        } else {
          // More than a day passed, reset streak
          setStreakData({
            count: 0,
            lastUpdated: format(today, 'yyyy-MM-dd'),
            cardsCompleted: 0
          });
        }
      } else {
        setStreakData(parsedData);
      }
    }
  }, []);
  
  useEffect(() => {
    // Save streak data to localStorage whenever it changes
    localStorage.setItem('min-day-streak', JSON.stringify(streakData));
  }, [streakData]);
  
  const incrementStreak = (cardsCompleted = 1) => {
    const today = new Date();
    const todayFormatted = format(today, 'yyyy-MM-dd');
    
    setStreakData(prevData => {
      // Calculate new cards completed count
      const newCardsCompleted = 
        prevData.lastUpdated && isSameDay(new Date(prevData.lastUpdated), today)
          ? prevData.cardsCompleted + cardsCompleted
          : cardsCompleted;
      
      // If we completed 5 or more cards today
      if (newCardsCompleted >= 5) {
        // If this is the first time today reaching 5 cards
        if (prevData.cardsCompleted < 5) {
          // Play animation by adding and removing class
          const streakElement = document.querySelector('.streakValue');
          if (streakElement) {
            streakElement.classList.add('streakAnimation');
            setTimeout(() => {
              streakElement.classList.remove('streakAnimation');
            }, 500);
          }
          
          // Try to vibrate device if available
          if (navigator.vibrate) {
            navigator.vibrate(200);
          }
          
          return {
            count: prevData.count + 1,
            lastUpdated: todayFormatted,
            cardsCompleted: newCardsCompleted
          };
        }
      }
      
      // Update cards completed but don't increment streak
      return {
        ...prevData,
        lastUpdated: todayFormatted,
        cardsCompleted: newCardsCompleted
      };
    });
  };
  
  return {
    dayStreak: streakData.count || userProfile?.dayStreak || 0,
    cardsCompletedToday: streakData.cardsCompleted,
    incrementStreak
  };
};
