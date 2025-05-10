const express = require('express');
const router = express.Router();
const Card = require('../models/Card');

router.get('/', async (req, res) => {
  try {
    const cards = await Card.find();
    console.log('Nombre de cartes trouvées:', cards.length);
    console.log('Détails de la première carte:', JSON.stringify(cards[0], null, 2));
    res.json(cards);
  } catch (error) {
    console.error('Erreur lors de la récupération des cartes:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
