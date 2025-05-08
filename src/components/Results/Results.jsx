import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Award, Medal } from 'lucide-react';
import styles from './Results.module.css';

const Results = ({ player, opponent }) => {
  const navigate = useNavigate();
  const playerWon = player.score > opponent.score;
  const isDraw = player.score === opponent.score;
  
  const handlePlayAgain = () => {
    navigate('/challenges/lobby');
  };
  
  const handleGoHome = () => {
    navigate('/challenges');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {isDraw ? 'Match nul!' : (playerWon ? 'Félicitations!' : 'Dommage!')}
      </h1>
      
      <div className={styles.medalContainer}>
        {isDraw ? (
          <div className={styles.medal}>🥈</div>
        ) : (
          <div className={styles.medal}>
            {playerWon ? '🏆' : '🥈'}
          </div>
        )}
      </div>
      
      <div className={styles.scoreBoard}>
        <div className={styles.playerResult}>
          <div className={styles.playerName}>
            {player.name}
            {playerWon && !isDraw && <Award className={styles.winnerIcon} />}
          </div>
          <div className={styles.playerScore}>{player.score} pts</div>
        </div>
        
        <div className={styles.versus}>vs</div>
        
        <div className={styles.playerResult}>
          <div className={styles.playerName}>
            {opponent.name}
            {!playerWon && !isDraw && <Award className={styles.winnerIcon} />}
          </div>
          <div className={styles.playerScore}>{opponent.score} pts</div>
        </div>
      </div>
      
      <div className={styles.actions}>
        <Button 
          variant="default" 
          onClick={handlePlayAgain}
          className={styles.playAgainButton}
        >
          Rejouer un match
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleGoHome}
          className={styles.homeButton}
        >
          Retour aux défis
        </Button>
      </div>
    </div>
  );
};

Results.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired
  }).isRequired,
  opponent: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired
  }).isRequired
};

export default Results;
