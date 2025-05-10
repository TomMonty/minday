import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MiniCard.module.css';

const MiniCard = ({ id, title, imageUrl, category }) => {
  return (
    <Link to={`/library/${category}/${id}`} className={styles.miniCard}>
      <div className={styles.imageContainer}>
        <img 
          src={imageUrl} 
          alt={title} 
          className={styles.image}
          onError={(e) => {
            console.error('Error loading image:', imageUrl);
            e.target.src = 'https://via.placeholder.com/400x300?text=Image+non+disponible';
          }}
        />
      </div>
      <h3 className={styles.title}>{title}</h3>
    </Link>
  );
};

export default MiniCard;
