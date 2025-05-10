import { createContext, useReducer, useContext, useEffect, useMemo, useCallback } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';

// Mock categories (tu peux décider plus tard de charger aussi depuis MongoDB)
const mockCategories = [
  { id: 1, name: 'Histoire', color: 'bg-red-500', count: 12, slug: 'histoire' },
  { id: 2, name: 'Sciences', color: 'bg-green-500', count: 8, slug: 'sciences' },
  { id: 3, name: 'Géographie', color: 'bg-blue-500', count: 5, slug: 'geographie' },
  { id: 4, name: 'Art', color: 'bg-pink-500', count: 10, slug: 'art' },
  { id: 5, name: 'Médias', color: 'bg-purple-500', count: 3, slug: 'medias' },
  { id: 6, name: 'Sports', color: 'bg-yellow-500', count: 7, slug: 'sports' }
];

// Initial state
const initialState = {
  cards: [],
  cardsCompletedToday: 0,
  categories: [],
  challenges: [],
  userProfile: {},
  lastSaved: null
};

// Reducers
const cardsReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CARDS':
      return { ...state, cards: action.payload };
    case 'COMPLETE_CARD': {
      const updatedCards = state.cards.map(card =>
        card._id === action.payload.id
          ? { ...card, completed: true }
          : card
      );
      const cardsCompletedToday = state.cardsCompletedToday + 1;

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
        card._id === action.payload.id
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

const appReducer = (state, action) => {
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

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        console.log('Chargement des données initiales...');
        const [cardsRes, userRes] = await Promise.all([
          axios.get('http://localhost:5000/api/cards'),
          axios.get('http://localhost:5000/api/users')
        ]);

        console.log('Réponse des cartes:', cardsRes.data);
        console.log('Réponse de l\'utilisateur:', userRes.data);

        dispatch({
          type: 'HYDRATE',
          payload: {
            cards: cardsRes.data,
            categories: mockCategories,
            userProfile: userRes.data,
            challenges: [],
            cardsCompletedToday: 0,
            lastSaved: new Date().toDateString()
          }
        });
      } catch (error) {
        console.error('Erreur lors du chargement des données initiales:', error);
      }
    };

    loadInitialData();
  }, []);

  const checkDayReset = () => {
    const today = new Date().toDateString();
    if (state.lastSaved && new Date(state.lastSaved).toDateString() !== today) {
      dispatch({ type: 'RESET_DAILY' });
    }
  };

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
    const savedCards = state.cards.filter(card => card.savedAt);

    if (!categorySlug || categorySlug === 'all') {
      return savedCards;
    }

    const categoryMap = {
      'histoire': ['1', '5'],
      'sciences': ['2'],
      'geographie': ['3'],
      'art': ['4'],
      'medias': [],
      'sports': []
    };

    const cardIds = categoryMap[categorySlug] || [];

    return savedCards.filter(card => cardIds.includes(card._id));
  }, [state.cards]);

  const getStreak = useCallback(() => {
    return state.userProfile?.stats?.dayStreak || 0;
  }, [state.userProfile]);

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
    dispatch({
      type: 'START_CHALLENGE',
      payload: { opponent, opponentAvatar }
    });
  }, []);

  const endChallenge = useCallback((challengeId, playerScore, opponentScore) => {
    dispatch({
      type: 'END_CHALLENGE',
      payload: { id: challengeId, playerScore, opponentScore }
    });
  }, []);

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
