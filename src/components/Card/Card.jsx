import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { ChevronRight, X, Check } from "lucide-react";

const Card = ({ id, title, subtitle, image, onReject, onSave, onMore }) => {
  return (
    <motion.div 
      className={styles.card}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        const threshold = 100;
        if (info.offset.x > threshold) {
          onSave(id);
        } else if (info.offset.x < -threshold) {
          onReject(id);
        }
      }}
    >
      <div className={styles.card__imageContainer}>
        <img src={image} alt={title} className={styles.card__image} />
      </div>
      <div className={styles.card__content}>
        <h3 className={styles.card__title}>{title}</h3>
        <p className={styles.card__subtitle}>{subtitle}</p>
        
        <button 
          className={styles.card__moreButton}
          onClick={() => onMore(id)}
        >
          <span>Plus d'infos</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className={styles.card__actions}>
        <Button 
          variant="outline" 
          className={styles.card__actionButton} 
          onClick={() => onReject(id)}
          aria-label="Reject"
        >
          <X className="w-5 h-5" />
        </Button>
        <Button 
          className={styles.card__actionButton} 
          onClick={() => onSave(id)}
          aria-label="Save"
        >
          <Check className="w-5 h-5" />
        </Button>
      </div>
    </motion.div>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onReject: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onMore: PropTypes.func.isRequired
};

export default Card;
