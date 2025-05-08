import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import styles from './VersusHeader.module.css';

const VersusHeader = ({ 
  player, 
  opponent, 
  currentQuestion,
  totalQuestions
}) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className={styles.container}>
      <div className={styles.versusHeader}>
        <div className={styles.playerInfo}>
          <Avatar className={styles.avatar}>
            <AvatarImage src={player.avatar} />
            <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className={styles.playerDetails}>
            <div className={styles.playerName}>{player.name}</div>
            <div className={styles.playerScore}>{player.score} pts</div>
          </div>
        </div>
        
        <div className={styles.versusLabel}>VS</div>
        
        <div className={styles.playerInfo}>
          <div className={styles.playerDetails + ' ' + styles.alignRight}>
            <div className={styles.playerName}>{opponent.name}</div>
            <div className={styles.playerScore}>{opponent.score} pts</div>
          </div>
          <Avatar className={styles.avatar}>
            <AvatarImage src={opponent.avatar} />
            <AvatarFallback>{opponent.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <div className={styles.progressWrapper}>
        <Progress 
          value={progressPercentage}
          className={styles.progress}
        />
        <div className={styles.questionCounter}>
          Question {currentQuestion}/{totalQuestions}
        </div>
      </div>
    </div>
  );
};

export default VersusHeader;
