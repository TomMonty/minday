
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

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
    <div>
      <h1 className="text-2xl font-bold mb-6">Challenges</h1>
      
      <h2 className="text-lg font-semibold mb-3">Top Joueurs</h2>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {challenges.map((user, index) => (
          <div key={user.id} className="flex items-center p-3 border-b last:border-b-0">
            <Avatar className="w-8 h-8 mr-3">
              <AvatarImage src={user.avatar} alt={user.user} />
              <AvatarFallback>{user.user.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <span className="font-medium">{user.user}</span>
            </div>
            <div className="text-sm">
              <span className="font-bold text-primary">{user.score}</span> pts
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <Button 
          onClick={handleStartChallenge}
          className="w-full bg-primary text-white py-3 rounded-xl font-medium"
        >
          <Trophy className="mr-2" />
          Challenge du jour
        </Button>
      </div>
    </div>
  );
};

export default Challenges;
