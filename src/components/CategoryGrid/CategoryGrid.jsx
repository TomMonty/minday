import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoryGrid.module.css';
import { Book, Atom, Globe, Palette, Film, Trophy } from "lucide-react";

const CategoryGrid = ({ categories }) => {
  // Map de catégories avec leurs icônes
  const getCategoryIcon = (slug) => {
    switch (slug) {
      case 'histoire':
        return <Book className="w-5 h-5" />;
      case 'sciences':
        return <Atom className="w-5 h-5" />;
      case 'geographie':
        return <Globe className="w-5 h-5" />;
      case 'art':
        return <Palette className="w-5 h-5" />;
      case 'medias':
        return <Film className="w-5 h-5" />;
      case 'sports':
        return <Trophy className="w-5 h-5" />;
      default:
        return <Book className="w-5 h-5" />;
    }
  };

  return (
    <div className={styles.grid}>
      {categories.map(category => (
        <Link 
          to={`/library/${category.slug}`} 
          key={category.id} 
          className={styles.categoryCard}
        >
          <div className={`${styles.categoryContent} ${category.color}`}>
            <div className={styles.categoryHeader}>
              <h3 className={styles.categoryTitle}>{category.name}</h3>
              {getCategoryIcon(category.slug)}
            </div>
            <div className={styles.categoryFooter}>
              <span className={styles.categoryCount}>{category.count} articles</span>
              <div className={styles.categoryArrow}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;
