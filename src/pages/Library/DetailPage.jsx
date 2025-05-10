import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Share2 } from 'lucide-react';
import styles from './DetailPage.module.css';
import { ScrollArea } from '@/components/ui/scroll-area';
import axios from 'axios';

const DetailPage = () => {
  const { id, cat } = useParams();
  const navigate = useNavigate();
  
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const returnToHome = sessionStorage.getItem('returnToHome') === 'true';

  useEffect(() => {
    if (returnToHome) {
      sessionStorage.removeItem('returnToHome');
    }
  }, [returnToHome]);

  useEffect(() => {
    const fetchSavedCard = async () => {
      try {
        console.log('Fetching saved card with ID:', id);
        const response = await axios.get(`http://localhost:5000/api/saved-cards/${id}`);
        console.log('Saved Card data received:', response.data);
        setArticle(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement de la carte sauvegardée:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchSavedCard();
    }
  }, [id]);

  const handleChallenge = () => {
    navigate(`/challenges/lobby?cardId=${id}`);
  };

  const handleBack = () => {
    if (returnToHome) {
      navigate('/home');
    } else {
      navigate(`/library/${cat}`);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Chargement...</div>;
  }

  if (error) {
    return <div className={styles.error}>Erreur : {error}</div>;
  }

  if (!article) {
    return <div className={styles.notFound}>Article non trouvé</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Button variant="ghost" size="sm" className={styles.backButton} onClick={handleBack}>
          <ChevronLeft className="w-5 h-5" />
          Retour
        </Button>
      </header>

      <ScrollArea className={styles.scrollArea}>
        <div className={styles.articleContainer}>
          <h1 className={styles.title}>{article.title}</h1>
          
          <div className={styles.imageContainer}>
            <img src={article.imageUrl} alt={article.title} className={styles.image} />
          </div>

          <div className={styles.content}>
            <p className={styles.subtitle}>{article.subtitle}</p>
            <p className={styles.paragraph}>{article.fullDescription}</p>
          </div>
        </div>
      </ScrollArea>

      <div className={styles.actions}>
        <Button className={styles.challengeButton} onClick={handleChallenge}>
          Challenger quelqu'un
        </Button>
        
        <Button variant="outline" size="icon" className={styles.shareButton}>
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default DetailPage;
