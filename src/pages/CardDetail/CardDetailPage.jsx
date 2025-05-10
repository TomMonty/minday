import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CardDetail from '@/components/CardDetail/CardDetail';

const CardDetailPage = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        console.log('Fetching card with ID:', id);
        const response = await axios.get(`http://localhost:5000/api/cards/${id}`);
        console.log('Card data received:', response.data);
        setCard(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des détails de la carte:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCardDetails();
  }, [id]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  if (!card) {
    return <div>Carte non trouvée</div>;
  }

  return <CardDetail card={card} />;
};

export default CardDetailPage; 