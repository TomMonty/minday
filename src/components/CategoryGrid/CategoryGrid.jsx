import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CategoryGrid.module.css';
import { useApp } from '@/context/AppContext';
import axios from 'axios';
import { Book, Atom, Globe, Palette, Film, Trophy } from "lucide-react";

const CategoryGrid = () => {
  const { state, userProfile } = useApp();
  const [categoryStats, setCategoryStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategoryStats = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/saved-cards/stats/${userProfile._id}`);
        setCategoryStats(response.data);
      } catch (error) {
        // ignore
      }
    };
    if (userProfile._id) {
      loadCategoryStats();
    }
  }, [userProfile._id]);

  const handleCategoryClick = (categorySlug) => {
    navigate(`/library/${categorySlug.toLowerCase()}`);
  };

  // Mettre à jour le nombre de cartes par catégorie
  const categoriesWithCount = state.categories.map(category => {
    const count = state.savedCards.filter(card => 
      card.category?.toLowerCase() === category.slug?.toLowerCase()
    ).length;
    return { ...category, count };
  });

  const getCategoryIcon = (slug) => {
    switch (slug) {
      case 'histoire':
        return <Book size={32} />;
      case 'sciences':
        return <Atom size={32} />;
      case 'geographie':
        return <Globe size={32} />;
      case 'art':
        return <Palette size={32} />;
      case 'medias':
        return <Film size={32} />;
      case 'sports':
        return <Trophy size={32} />;
      default:
        return null;
    }
  };

  const getCardLabel = (count) => count > 1 ? `${count} cartes` : `${count} carte`;

  return (
    <div className={styles.grid}>
      {categoriesWithCount.map((category) => (
        <button
          key={category.id}
          className={`${styles.categoryCard} ${styles[category.slug]}`}
          onClick={() => handleCategoryClick(category.slug)}
        >
          <div className={styles.icon}>{getCategoryIcon(category.slug)}</div>
          <div className={styles.info}>
            <div className={styles.name}>{category.name}</div>
            <div className={styles.count}>{getCardLabel(category.count)}</div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default CategoryGrid;
