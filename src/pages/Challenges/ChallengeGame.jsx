import React, { useReducer, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import VersusHeader from '@/components/VersusHeader/VersusHeader';
import QuizQuestion from '@/components/QuizQuestion/QuizQuestion';
import Results from '@/components/Results/Results';
import styles from './ChallengeGame.module.css';
import { toast } from '@/hooks/use-toast';
import { useApp } from '@/context/AppContext';

// Mock quiz data for random topics
const randomQuizQuestions = [
  {
    id: 1,
    text: "Quelle est la capitale de l'Australie ?",
    answers: [
      { id: 1, text: "Sydney", isCorrect: false },
      { id: 2, text: "Melbourne", isCorrect: false },
      { id: 3, text: "Canberra", isCorrect: true },
      { id: 4, text: "Perth", isCorrect: false }
    ]
  },
  {
    id: 2,
    text: "En quelle année la première Coupe du Monde de football a-t-elle eu lieu ?",
    answers: [
      { id: 1, text: "1930", isCorrect: true },
      { id: 2, text: "1950", isCorrect: false },
      { id: 3, text: "1926", isCorrect: false },
      { id: 4, text: "1934", isCorrect: false }
    ]
  },
  {
    id: 3,
    text: "Quel élément chimique a pour symbole 'Fe' ?",
    answers: [
      { id: 1, text: "Fluor", isCorrect: false },
      { id: 2, text: "Fer", isCorrect: true },
      { id: 3, text: "Phosphore", isCorrect: false },
      { id: 4, text: "Fermium", isCorrect: false }
    ]
  },
  {
    id: 4,
    text: "Qui a peint 'La Nuit étoilée' ?",
    answers: [
      { id: 1, text: "Pablo Picasso", isCorrect: false },
      { id: 2, text: "Claude Monet", isCorrect: false },
      { id: 3, text: "Vincent van Gogh", isCorrect: true },
      { id: 4, text: "Leonardo da Vinci", isCorrect: false }
    ]
  },
  {
    id: 5,
    text: "Combien de côtés a un hexagone ?",
    answers: [
      { id: 1, text: "5", isCorrect: false },
      { id: 2, text: "6", isCorrect: true },
      { id: 3, text: "7", isCorrect: false },
      { id: 4, text: "8", isCorrect: false }
    ]
  }
];

// Mock quiz data for knowledge-based topics
const knowledgeQuizQuestions = [
  {
    id: 1,
    text: "Quand la Grande Muraille de Chine a-t-elle été principalement construite ?",
    answers: [
      { id: 1, text: "Durant la dynastie Ming", isCorrect: true },
      { id: 2, text: "Durant la dynastie Han", isCorrect: false },
      { id: 3, text: "Durant la dynastie Tang", isCorrect: false },
      { id: 4, text: "Durant la dynastie Qing", isCorrect: false }
    ]
  },
  {
    id: 2,
    text: "Quelle est la hauteur de la plus grande pyramide de Gizeh ?",
    answers: [
      { id: 1, text: "146 mètres", isCorrect: true },
      { id: 2, text: "139 mètres", isCorrect: false },
      { id: 3, text: "155 mètres", isCorrect: false },
      { id: 4, text: "128 mètres", isCorrect: false }
    ]
  },
  {
    id: 3,
    text: "Quand le Taj Mahal a-t-il été construit ?",
    answers: [
      { id: 1, text: "1632-1653", isCorrect: true },
      { id: 2, text: "1550-1570", isCorrect: false },
      { id: 3, text: "1700-1720", isCorrect: false },
      { id: 4, text: "1600-1610", isCorrect: false }
    ]
  },
  {
    id: 4,
    text: "À quelle altitude se trouve Machu Picchu ?",
    answers: [
      { id: 1, text: "2430 mètres", isCorrect: true },
      { id: 2, text: "1800 mètres", isCorrect: false },
      { id: 3, text: "3100 mètres", isCorrect: false },
      { id: 4, text: "2850 mètres", isCorrect: false }
    ]
  },
  {
    id: 5,
    text: "Quand l'Acropole d'Athènes a-t-elle été principalement construite ?",
    answers: [
      { id: 1, text: "5ème siècle av. J.-C.", isCorrect: true },
      { id: 2, text: "3ème siècle av. J.-C.", isCorrect: false },
      { id: 3, text: "7ème siècle av. J.-C.", isCorrect: false },
      { id: 4, text: "1er siècle av. J.-C.", isCorrect: false }
    ]
  }
];

// Reducer function
const gameReducer = (state, action) => {
  switch (action.type) {
    case 'ANSWER_QUESTION':
      return {
        ...state,
        player: {
          ...state.player,
          score: action.payload.isCorrect ? state.player.score + 20 : state.player.score
        },
        isQuestionAnswered: true
      };
    case 'OPPONENT_ANSWER':
      return {
        ...state,
        opponent: {
          ...state.opponent,
          score: action.payload.isCorrect ? state.opponent.score + 20 : state.opponent.score
        }
      };
    case 'SET_QUESTION_ANSWERED':
      return {
        ...state,
        isQuestionAnswered: action.payload
      };
    case 'NEXT_QUESTION':
      const nextQuestion = state.currentQuestion + 1;
      return {
        ...state,
        currentQuestion: nextQuestion,
        isQuestionAnswered: false,
        gameFinished: nextQuestion > state.totalQuestions
      };
    default:
      return state;
  }
};

const ChallengeGame = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get('mode') || 'random';
  const cardId = queryParams.get('cardId');
  const { state: appState } = useApp();
  
  // Choose question set based on mode
  const quizQuestions = mode === 'knowledge' ? knowledgeQuizQuestions : randomQuizQuestions;
  
  // Initialize the game state
  const initialState = {
    player: {
      name: "Vous",
      avatar: "",
      score: 0
    },
    opponent: {
      name: "Adversaire",
      avatar: "",
      score: 0
    },
    currentQuestion: 1,
    isQuestionAnswered: false,
    gameFinished: false,
    totalQuestions: quizQuestions.length
  };
  
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [loading, setLoading] = useState(true);
  const [topicInfo, setTopicInfo] = useState(null);
  
  useEffect(() => {
    // If a cardId is provided, get the card info for displaying the topic
    if (cardId) {
      const card = appState.cards.find(c => c.id === cardId);
      if (card) {
        setTopicInfo({
          title: card.title
        });
      }
    }
    
    // Simulate game loading
    const timer = setTimeout(() => {
      setLoading(false);
      toast({
        title: "Match commencé!",
        description: `Répondez aux questions sur ${mode === 'knowledge' ? 'vos connaissances' : 'des sujets aléatoires'}.`
      });
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [cardId, mode, appState.cards]);
  
  useEffect(() => {
    // Simulate opponent's answer after player answers
    if (state.isQuestionAnswered && !state.gameFinished) {
      const timer = setTimeout(() => {
        // Simulate opponent's random answer with 70% chance to be correct
        const isOpponentCorrect = Math.random() < 0.7;
        dispatch({ type: 'OPPONENT_ANSWER', payload: { isCorrect: isOpponentCorrect } });
        
        // Proceed to next question
        setTimeout(() => {
          dispatch({ type: 'NEXT_QUESTION' });
        }, 1000);
      }, 1500 + Math.random() * 1000); // Random delay for opponent
      
      return () => clearTimeout(timer);
    }
  }, [state.isQuestionAnswered, state.gameFinished]);
  
  const handleAnswer = (answerId, isCorrect) => {
    dispatch({ type: 'ANSWER_QUESTION', payload: { isCorrect } });
  };
  
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>Chargement du défi...</div>
      </div>
    );
  }
  
  return (
    <div className={styles.container}>
      {topicInfo && (
        <div className={styles.topicContainer}>
          <div className={styles.topicLabel}>Sujet du challenge</div>
          <div className={styles.topicTitle}>{topicInfo.title}</div>
        </div>
      )}
      
      {!state.gameFinished ? (
        <>
          <VersusHeader 
            player={state.player}
            opponent={state.opponent}
            currentQuestion={state.currentQuestion}
            totalQuestions={state.totalQuestions}
          />
          
          <QuizQuestion 
            question={quizQuestions[state.currentQuestion - 1]}
            onAnswer={handleAnswer}
            isAnswered={state.isQuestionAnswered}
          />
        </>
      ) : (
        <Results player={state.player} opponent={state.opponent} />
      )}
    </div>
  );
};

export default ChallengeGame;
