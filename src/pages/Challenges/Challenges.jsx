import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import styles from './Challenges.module.css';

const Challenges = () => {
  const navigate = useNavigate();
  const challenges = [
    { id: 1, user: 'Thomas', score: 120, avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100' },
    { id: 2, user: 'Sophie', score: 95, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    { id: 3, user: 'Martin', score: 82, avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100' },
    { id: 4, user: 'Julie', score: 78, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100' },
  ];

  const handleStartChallenge = () => {
    navigate('/challenges/lobby');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Challenges</h1>
      
      <div className={styles.leaderboardContainer}>
        <h2 className={styles.leaderboardTitle}>Top Joueurs</h2>
        <div className={styles.leaderboard}>
          {challenges.map((user, index) => (
            <div key={user.id} className={styles.leaderboardItem}>
              <div className={styles.rank}>{index + 1}</div>
              <Avatar className={styles.avatar}>
                <AvatarImage src={user.avatar} alt={user.user} />
                <AvatarFallback>{user.user.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className={styles.userInfo}>
                <span className={styles.username}>{user.user}</span>
                <span className={styles.score}>{user.score} pts</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.challengeButtonContainer}>
        <Button 
          onClick={handleStartChallenge}
          className={styles.challengeButton}
          size="lg"
        >
          <Trophy className="w-5 h-5 mr-2" />
          Challenge du jour
        </Button>
      </div>
    </div>
  );
};

export default Challenges;
