import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import styles from './CardDetail.module.css';

const CardDetail = ({ card }) => {
  const navigate = useNavigate();

  if (!card) {
    return <div>Chargement...</div>;
  }

  console.log('Carte reçue:', card); // Pour déboguer

  return (
    <div className={styles.container}>
      <Button
        variant="ghost"
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour
      </Button>

      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img src={card.imageUrl} alt={card.title} className={styles.image} />
        </div>

        <div className={styles.details}>
          <h1 className={styles.title}>{card.title}</h1>
          <h2 className={styles.subtitle}>{card.subtitle}</h2>
          <div className={styles.description}>
            <h3>Description complète :</h3>
            <p>{card.fullDescription}</p>
          </div>
          <div className={styles.category}>
            <span className={styles.categoryLabel}>Catégorie :</span>
            <span className={styles.categoryValue}>{card.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail; 