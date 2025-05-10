const express = require('express');
const router = express.Router();
const Card = require('../models/Card');

// Récupérer toutes les cartes
router.get('/', async (req, res) => {
  try {
    // Récupérer toutes les cartes dans un ordre aléatoire
    const total = await Card.countDocuments();
    const cards = await Card.aggregate([{ $sample: { size: total } }]);
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Récupérer une carte par son ID
router.get('/:id', async (req, res) => {
  try {
    console.log('Recherche de la carte avec ID:', req.params.id);
    const card = await Card.findById(req.params.id);
    if (!card) {
      console.log('Carte non trouvée');
      return res.status(404).json({ message: 'Carte non trouvée' });
    }
    console.log('Carte trouvée:', JSON.stringify(card, null, 2));
    res.json(card);
  } catch (error) {
    console.error('Erreur lors de la récupération de la carte:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
