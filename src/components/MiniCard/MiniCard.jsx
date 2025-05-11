import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MiniCard.module.css';
import { useApp } from '@/context/AppContext';
import { Bookmark } from 'lucide-react';

const MiniCard = ({ card }) => {
  const navigate = useNavigate();
  const { state, saveCard, removeSavedCard } = useApp();
  
  // Vérification de sécurité pour savedCards
  const isSaved = state.savedCards && state.savedCards.some(savedCard => 
    savedCard.cardId === card.cardId
  );

  const handleSave = async (e) => {
    e.stopPropagation();
    try {
      console.log('Tentative de sauvegarde - Carte:', card);
      console.log('ID de la carte:', card.cardId);
      console.log('ID de l\'utilisateur:', state.userProfile._id);

      if (isSaved) {
        const savedCard = state.savedCards.find(saved => saved.cardId === card.cardId);
        console.log('Carte trouvée dans les sauvegardes:', savedCard);
        if (savedCard) {
          await removeSavedCard(savedCard._id);
        }
      } else {
        await saveCard(card.cardId);
      }
    } catch (error) {
      console.error('Erreur détaillée lors de la sauvegarde de la carte:', error);
      if (error.response) {
        console.error('Réponse du serveur:', error.response.data);
      }
    }
  };

  const handleClick = () => {
    navigate(`/library/detail/${card._id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <img 
          src={card.imageUrl} 
          alt={card.title} 
          className={styles.image}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Image+non+disponible';
          }}
        />
        <button 
          className={`${styles.saveButton} ${isSaved ? styles.saved : ''}`}
          onClick={handleSave}
          aria-label={isSaved ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          {isSaved ? '★' : '☆'}
        </button>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{card.title}</h3>
        <p className={styles.subtitle}>{card.subtitle}</p>
        <p className={styles.description}>{card.shortDescription}</p>
        <span className={styles.category}>{card.category}</span>
      </div>
    </div>
  );
};

export default MiniCard;
