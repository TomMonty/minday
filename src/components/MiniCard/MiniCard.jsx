import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MiniCard.module.css';

const MiniCard = ({ id, title, image, category }) => {
  return (
    <Link to={`/library/${category}/${id}`} className={styles.miniCard}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <h3 className={styles.title}>{title}</h3>
    </Link>
  );
};

export default MiniCard;
