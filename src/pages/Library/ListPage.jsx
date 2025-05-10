import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import { ScrollArea } from "@/components/ui/scroll-area";
import MiniCard from '@/components/MiniCard/MiniCard';
import styles from './ListPage.module.css';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import axios from 'axios';

const ListPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { state } = useApp();
  const [savedCards, setSavedCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirection si aucune catégorie n'est sélectionnée
  if (!category) {
    return <Navigate to="/library" replace />;
  }

  useEffect(() => {
    const fetchSavedCards = async () => {
      setLoading(true);
      setError(null);
      try {
        const userId = state.userProfile?._id;
        if (!userId) {
          setSavedCards([]);
          setLoading(false);
          return;
        }
        const res = await axios.get(`http://localhost:5000/api/saved-cards/user/${userId}`);
        setSavedCards(res.data);
      } catch (err) {
        setError('Erreur lors du chargement des cartes sauvegardées.');
        setSavedCards([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedCards();
  }, [state.userProfile?._id]);

  // Filtrer côté frontend selon la catégorie
  const normalizedCategory = category?.toLowerCase();
  const filteredCards = savedCards.filter(card => card.category?.toLowerCase() === normalizedCategory);

  // Obtenir le nom de la catégorie en français
  const getCategoryName = (slug) => {
    const categories = {
      'histoire': 'Histoire',
      'sciences': 'Sciences',
      'geographie': 'Géographie',
      'art': 'Art',
      'medias': 'Médias',
      'sports': 'Sports'
    };
    return categories[slug?.toLowerCase()] || slug;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/library">
          <Button variant="ghost" size="sm" className={styles.backButton}>
            <ChevronLeft className="w-5 h-5" />
            Retour
          </Button>
        </Link>
        <h1 className={styles.title}>{getCategoryName(category)}</h1>
        <span className={styles.cardCount}>
          {loading ? 'Chargement...' : `${filteredCards.length} articles sauvegardés`}
        </span>
      </header>
      <ScrollArea className={styles.scrollArea}>
        <div className={styles.cardGrid}>
          {loading ? (
            <div className={styles.emptyState}>Chargement...</div>
          ) : error ? (
            <div className={styles.emptyState}>{error}</div>
          ) : filteredCards.length > 0 ? (
            filteredCards.map(card => (
              <div key={card._id} className={styles.cardWrapper}>
                <MiniCard card={card} />
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <p>Aucune carte sauvegardée dans cette catégorie</p>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className={styles.actions}>
        <Button className={styles.exploreButton} onClick={() => navigate('/home')}>
          Explorer plus d'articles
        </Button>
      </div>
    </div>
  );
};

export default ListPage;
