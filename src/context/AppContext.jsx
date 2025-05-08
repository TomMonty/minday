import { createContext, useReducer, useContext, useEffect, useMemo, useCallback } from 'react';
import { debounce } from 'lodash';

// Mock data
const mockCards = [
  {
    id: "1",
    title: "La Grande Muraille de Chine",
    subtitle: "Une merveille architecturale impressionnante",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d"
  },
  {
    id: "2",
    title: "Les Pyramides de Gizeh",
    subtitle: "Mystères de l'Égypte ancienne",
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368"
  },
  {
    id: "3",
    title: "Le Taj Mahal",
    subtitle: "Un symbole d'amour éternel en Inde",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada"
  },
  {
    id: "4",
    title: "Machu Picchu",
    subtitle: "Cité perdue des Incas au Pérou",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1"
  },
  {
    id: "5",
    title: "L'Acropole d'Athènes",
    subtitle: "Berceau de la civilisation occidentale",
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235"
  }
];

const mockCategories = [
  { id: 1, name: 'Histoire', color: 'bg-red-500', count: 12, slug: 'histoire' },
  { id: 2, name: 'Sciences', color: 'bg-green-500', count: 8, slug: 'sciences' },
  { id: 3, name: 'Géographie', color: 'bg-blue-500', count: 5, slug: 'geographie' },
  { id: 4, name: 'Art', color: 'bg-pink-500', count: 10, slug: 'art' },
  { id: 5, name: 'Médias', color: 'bg-purple-500', count: 3, slug: 'medias' },
  { id: 6, name: 'Sports', color: 'bg-yellow-500', count: 7, slug: 'sports' },
];

// Default user profile
const defaultProfile = {
  name: "Alex Johnson",
  bio: "L'histoire du monde, L'évolution artificielle, Avancés science",
  location: "San Francisco, CA",
  avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
  cardsLearned: 124,
  challengesWon: 15,
  dayStreak: 7
};

// Initial state
const initialState = {
  cards: mockCards,
  cardsCompletedToday: 0,
  categories: mockCategories,
  challenges: [],
  userProfile: defaultProfile,
  lastSaved: null
};

// Domain-specific reducers
const cardsReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CARDS':
      return { ...state, cards: action.payload };
    case 'COMPLETE_CARD': {
      const updatedCards = state.cards.map(card => 
        card.id === action.payload.id 
          ? { ...card, completed: true } 
          : card
      );
      const cardsCompletedToday = state.cardsCompletedToday + 1;
      
      // Update user streak if they've completed 5 or more cards today
      let userProfile = state.userProfile;
      if (cardsCompletedToday >= 5 && state.cardsCompletedToday < 5) {
        userProfile = {
          ...userProfile,
          dayStreak: userProfile.dayStreak + 1,
          cardsLearned: userProfile.cardsLearned + 1
        };
      } else {
        userProfile = {
          ...userProfile,
          cardsLearned: userProfile.cardsLearned + 1
        };
      }
      
      return { 
        ...state, 
        cards: updatedCards, 
        cardsCompletedToday, 
        userProfile
      };
    }
    case 'SAVE_CARD': {
      const updatedCards = state.cards.map(card => 
        card.id === action.payload.id 
          ? { ...card, savedAt: new Date().toISOString() } 
          : card
      );
      return { ...state, cards: updatedCards };
    }
    case 'RESET_DAILY':
      return { ...state, cardsCompletedToday: 0 };
    default:
      return state;
  }
};

const challengeReducer = (state, action) => {
  switch (action.type) {
    case 'START_CHALLENGE': {
      const newChallenge = {
        id: Date.now().toString(),
        opponent: action.payload.opponent,
        opponentAvatar: action.payload.opponentAvatar,
        playerScore: 0,
        opponentScore: 0,
        status: 'active'
      };
      return { ...state, challenges: [...state.challenges, newChallenge] };
    }
    case 'END_CHALLENGE': {
      const { id, playerScore, opponentScore } = action.payload;
      
      const updatedChallenges = state.challenges.map(challenge => {
        if (challenge.id === id) {
          let result;
          if (playerScore > opponentScore) {
            result = 'win';
          } else if (playerScore < opponentScore) {
            result = 'loss';
          } else {
            result = 'draw';
          }
          
          return { 
            ...challenge, 
            status: 'completed', 
            playerScore,
            opponentScore,
            result
          };
        }
        return challenge;
      });
      
      // Update user profile if the player won
      let userProfile = state.userProfile;
      const challenge = updatedChallenges.find(c => c.id === id);
      if (challenge && challenge.result === 'win') {
        userProfile = {
          ...userProfile,
          challengesWon: userProfile.challengesWon + 1
        };
      }
      
      return { 
        ...state, 
        challenges: updatedChallenges,
        userProfile
      };
    }
    default:
      return state;
  }
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return { 
        ...state, 
        userProfile: { ...state.userProfile, ...action.payload } 
      };
    default:
      return state;
  }
};

// Main reducer that delegates to domain-specific reducers
const appReducer = (state, action) => {
  // First try domain-specific reducers
  switch (action.type) {
    case 'LOAD_CARDS':
    case 'COMPLETE_CARD':
    case 'SAVE_CARD':
    case 'RESET_DAILY':
      return cardsReducer(state, action);
      
    case 'START_CHALLENGE':
    case 'END_CHALLENGE':
      return challengeReducer(state, action);
      
    case 'UPDATE_USER':
      return userReducer(state, action);
      
    case 'HYDRATE':
      return { ...state, ...action.payload };
      
    default:
      return state;
  }
};

export const AppContext = createContext(null);

// Custom hook for accessing context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Provider component
export const AppProvider = ({ children }) => {
  // Initialize state from localStorage or default
  const [state, dispatch] = useReducer(appReducer, initialState, (initial) => {
    try {
      const storedState = localStorage.getItem('min-day-state');
      const storedProfile = localStorage.getItem('min-day-profile');
      const storedStreak = localStorage.getItem('min-day-streak');
      
      // Parsing stored state or using initial state
      const parsedState = storedState ? JSON.parse(storedState) : {};
      const parsedProfile = storedProfile ? JSON.parse(storedProfile) : initial.userProfile;
      
      // Determine if we need to reset daily counters
      const today = new Date().toDateString();
      const lastSaved = parsedState.lastSaved || null;
      const resetDaily = lastSaved && new Date(lastSaved).toDateString() !== today;
      
      return {
        ...initial,
        ...parsedState,
        userProfile: parsedProfile,
        cardsCompletedToday: resetDaily ? 0 : parsedState.cardsCompletedToday || 0,
        lastSaved: today
      };
    } catch (error) {
      console.error('Error loading state from localStorage:', error);
      return initial;
    }
  });
  
  const checkDayReset = () => {
    const today = new Date().toDateString();
    if (state.lastSaved && new Date(state.lastSaved).toDateString() !== today) {
      dispatch({ type: 'RESET_DAILY' });
    }
  };

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const saveState = debounce(() => {
      localStorage.setItem('min-day-state', JSON.stringify({
        ...state,
        lastSaved: new Date().toDateString()
      }));
      localStorage.setItem('min-day-profile', JSON.stringify(state.userProfile));
    }, 1000);

    saveState();
    return () => saveState.cancel();
  }, [state]);

  // Check for day reset on mount and every minute
  useEffect(() => {
    checkDayReset();
    const interval = setInterval(checkDayReset, 60000);
    return () => clearInterval(interval);
  }, []);
  
  // Selectors
  const getTodayCards = useCallback(() => {
    return state.cards.filter(card => !card.completed);
  }, [state.cards]);
  
  const getLibraryByCategory = useCallback((categorySlug) => {
    // Only return cards that have been saved
    const savedCards = state.cards.filter(card => card.savedAt);
    
    // If no category or 'all', return all saved cards
    if (!categorySlug || categorySlug === 'all') {
      return savedCards;
    }
    
    // Define strict category assignments for cards
    const categoryMap = {
      'histoire': ['1', '5'],
      'sciences': ['2'],
      'geographie': ['3'],
      'art': ['4'],
      'medias': [],
      'sports': []
    };
    
    // Get card IDs for the requested category
    const cardIds = categoryMap[categorySlug] || [];
    
    // Only return saved cards that belong to this category
    return savedCards.filter(card => cardIds.includes(card.id));
  }, [state.cards]);
  
  const getStreak = useCallback(() => {
    return state.userProfile.dayStreak;
  }, [state.userProfile.dayStreak]);
  
  // Action helpers
  const completeCard = useCallback((id) => {
    dispatch({ type: 'COMPLETE_CARD', payload: { id } });
  }, []);
  
  const saveCard = useCallback((id) => {
    dispatch({ type: 'SAVE_CARD', payload: { id } });
  }, []);
  
  const updateUserProfile = useCallback((updates) => {
    dispatch({ type: 'UPDATE_USER', payload: updates });
  }, []);
  
  const startChallenge = useCallback((opponent, opponentAvatar) => {
    const challengeId = Date.now().toString();
    dispatch({ 
      type: 'START_CHALLENGE', 
      payload: { opponent, opponentAvatar } 
    });
    return challengeId;
  }, []);
  
  const endChallenge = useCallback((challengeId, playerScore, opponentScore) => {
    dispatch({ 
      type: 'END_CHALLENGE', 
      payload: { id: challengeId, playerScore, opponentScore } 
    });
  }, []);
  
  // Create memoized context value
  const contextValue = useMemo(() => ({
    state,
    dispatch,
    getTodayCards,
    getLibraryByCategory,
    getStreak,
    completeCard,
    saveCard,
    updateUserProfile,
    startChallenge,
    endChallenge,
    userProfile: state.userProfile
  }), [
    state, 
    getTodayCards,
    getLibraryByCategory,
    getStreak,
    completeCard,
    saveCard,
    updateUserProfile,
    startChallenge,
    endChallenge
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
