import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ScrollArea } from "@/components/ui/scroll-area";
import MiniCard from '@/components/MiniCard/MiniCard';
import styles from './ListPage.module.css';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const ListPage = () => {
  const { cat } = useParams();
  const { getLibraryByCategory } = useApp();
  
  // Get cards for this category
  const categoryItems = getLibraryByCategory(cat || '');
  
  // Determine the title of the category
  const getCategoryName = () => {
    switch (cat) {
      case 'histoire': return 'Histoire';
      case 'sciences': return 'Sciences';
      case 'geographie': return 'Géographie';
      case 'art': return 'Art';
      case 'medias': return 'Médias';
      case 'sports': return 'Sports';
      default: return 'Catégorie';
    }
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
        <h1 className={styles.title}>{getCategoryName()}</h1>
      </header>
      
      <ScrollArea className={styles.scrollArea}>
        <div className={styles.cardsGrid}>
          {categoryItems.map(item => (
            <MiniCard 
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              category={cat || 'default'}
            />
          ))}
        </div>
      </ScrollArea>
      
      <div className={styles.actions}>
        <Button className={styles.exploreButton}>
          Explorer plus d'articles
        </Button>
      </div>
    </div>
  );
};

export default ListPage;
