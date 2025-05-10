import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import styles from './ChallengeLobby.module.css';
import { User, Users, BookOpen, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useApp } from '@/context/AppContext';

const ChallengeLobby = () => {
  const [username, setUsername] = useState('');
  const [challengeMode, setChallengeMode] = useState('random');
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useApp();
  const { cards } = state;
  
  const queryParams = new URLSearchParams(location.search);
  const cardId = queryParams.get('cardId');
  
  const cardTitle = cardId ? cards.find(card => card.id === cardId)?.title : null;
  
  useEffect(() => {
    if (cardTitle) {
      toast({
        title: "Sujet sélectionné",
        description: `Vous allez défier quelqu'un sur "${cardTitle}"`,
      });
      setChallengeMode('knowledge');
    }
  }, [cardTitle]);

  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const handleRandomMatch = () => {
    const roomId = generateRoomId();
    toast({
      title: "Match trouvé!",
      description: "Votre adversaire aléatoire est prêt",
    });
    setTimeout(() => {
      navigate(`/challenges/${roomId}?mode=${challengeMode}${cardId ? `&cardId=${cardId}` : ''}`);
    }, 1500);
  };

  const handleFriendChallenge = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      toast({
        title: "Nom d'utilisateur requis",
        description: "Veuillez entrer un nom d'utilisateur",
        variant: "destructive"
      });
      return;
    }
    
    const roomId = generateRoomId();
    toast({
      title: "Invitation envoyée!",
      description: `En attente de ${username}...`,
    });
    
    // Simuler l'acceptation de l'invitation
    setTimeout(() => {
      toast({
        title: "Invitation acceptée!",
        description: `${username} a rejoint le défi`,
      });
      setTimeout(() => {
        navigate(`/challenges/${roomId}?mode=${challengeMode}${cardId ? `&cardId=${cardId}` : ''}`);
      }, 1000);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <h1 className="text-2xl font-bold mb-6">Défier un ami</h1>
      
      {cardTitle && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-800">Sujet: <strong>{cardTitle}</strong></p>
        </div>
      )}
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Choisissez un mode de jeu</h2>
        <Tabs defaultValue={challengeMode} onValueChange={(value) => setChallengeMode(value)}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="knowledge" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Mes connaissances</span>
            </TabsTrigger>
            <TabsTrigger value="random" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Sujets aléatoires</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="knowledge">
            <p className="text-sm text-muted-foreground mb-4">
              Testez vos connaissances avec des questions basées sur votre bibliothèque personnelle.
            </p>
          </TabsContent>
          <TabsContent value="random">
            <p className="text-sm text-muted-foreground mb-4">
              Affrontez vos amis sur des sujets variés et aléatoires.
            </p>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className={styles.challengeOptions}>
        <div className={styles.option}>
          <Button 
            onClick={handleRandomMatch} 
            className={styles.randomButton}
            variant="secondary"
            size="lg"
          >
            <Users className="mr-2" />
            Match aléatoire
          </Button>
        </div>
        
        <div className={styles.divider}>ou</div>
        
        <div className={styles.option}>
          <form onSubmit={handleFriendChallenge} className={styles.friendForm}>
            <div className="mb-4">
              <Label htmlFor="username">Nom d'ami</Label>
              <Input
                id="username"
                type="text"
                placeholder="Entrez le nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
              />
            </div>
            <Button type="submit" className={styles.challengeButton}>
              <User className="mr-2" />
              Défier cet ami
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChallengeLobby;
