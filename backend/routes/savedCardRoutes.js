const express = require('express');
const router = express.Router();
const SavedCard = require('../models/SavedCard');
const Card = require('../models/Card');
const User = require('../models/User');
const mongoose = require('mongoose');

// Sauvegarder une carte
router.post('/', async (req, res) => {
  try {
    const { cardId, userId } = req.body;
    console.log('Tentative de sauvegarde - Données reçues:', { cardId, userId });

    // Validation des données
    if (!cardId || !userId) {
      console.error('Données manquantes:', { cardId, userId });
      return res.status(400).json({ 
        message: 'Données manquantes',
        received: { cardId, userId }
      });
    }

    // Validation des IDs
    if (!mongoose.Types.ObjectId.isValid(cardId) || !mongoose.Types.ObjectId.isValid(userId)) {
      console.error('IDs invalides:', { cardId, userId });
      return res.status(400).json({ 
        message: 'IDs invalides',
        received: { cardId, userId }
      });
    }

    // Vérifier si l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      console.error('Utilisateur non trouvé:', userId);
      return res.status(404).json({ 
        message: 'Utilisateur non trouvé',
        userId: userId
      });
    }

    // Récupérer la carte originale
    const originalCard = await Card.findById(cardId);
    console.log('Carte originale trouvée:', originalCard ? 'Oui' : 'Non');
    
    if (!originalCard) {
      console.error('Carte non trouvée avec l\'ID:', cardId);
      return res.status(404).json({ 
        message: 'Carte non trouvée',
        cardId: cardId
      });
    }

    // Vérifier si la carte est déjà sauvegardée
    const existingSavedCard = await SavedCard.findOne({ 
      cardId: cardId,
      userId: userId 
    });

    console.log('Carte déjà sauvegardée:', existingSavedCard ? 'Oui' : 'Non');

    if (existingSavedCard) {
      return res.status(400).json({ 
        message: 'Cette carte est déjà sauvegardée',
        existingCard: existingSavedCard
      });
    }

    // Créer une nouvelle carte sauvegardée avec toutes les informations
    const savedCard = new SavedCard({
      cardId: originalCard._id,
      title: originalCard.title,
      subtitle: originalCard.subtitle,
      shortDescription: originalCard.shortDescription,
      fullDescription: originalCard.fullDescription,
      imageUrl: originalCard.imageUrl,
      category: originalCard.category,
      userId: userId,
      savedAt: new Date()
    });

    console.log('Nouvelle carte à sauvegarder:', savedCard);
    
    // Validation du schéma avant la sauvegarde
    const validationError = savedCard.validateSync();
    if (validationError) {
      console.error('Erreur de validation:', validationError);
      return res.status(400).json({
        message: 'Erreur de validation',
        errors: validationError.errors
      });
    }

    await savedCard.save();
    console.log('Carte sauvegardée avec succès');

    // Supprimer la carte de la collection cards après sauvegarde
    await Card.findByIdAndDelete(cardId);
    console.log('Carte supprimée de la collection cards:', cardId);

    res.status(201).json(savedCard);
  } catch (error) {
    console.error('Erreur détaillée lors de la sauvegarde:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Erreur de validation',
        errors: error.errors
      });
    }
    res.status(500).json({ 
      message: error.message,
      stack: error.stack
    });
  }
});

// Obtenir toutes les cartes sauvegardées d'un utilisateur
router.get('/user/:userId', async (req, res) => {
  try {
    const savedCards = await SavedCard.find({ userId: req.params.userId });
    console.log('Cartes sauvegardées trouvées:', savedCards.length);
    res.json(savedCards);
  } catch (error) {
    console.error('Erreur lors de la récupération des cartes:', error);
    res.status(500).json({ message: error.message });
  }
});

// Obtenir les statistiques des cartes sauvegardées par catégorie
router.get('/stats/:userId', async (req, res) => {
  try {
    const savedCards = await SavedCard.find({ userId: req.params.userId });
    
    // Compter le nombre de cartes par catégorie
    const stats = savedCards.reduce((acc, saved) => {
      acc[saved.category] = (acc[saved.category] || 0) + 1;
      return acc;
    }, {});

    console.log('Statistiques des catégories:', stats);
    res.json(stats);
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    res.status(500).json({ message: error.message });
  }
});

// Supprimer une carte sauvegardée
router.delete('/:cardId/user/:userId', async (req, res) => {
  try {
    const { cardId, userId } = req.params;
    console.log('Tentative de suppression:', { cardId, userId });
    
    const result = await SavedCard.findOneAndDelete({ cardId: cardId, userId });
    console.log('Résultat de la suppression:', result);
    
    res.json({ message: 'Carte supprimée des favoris' });
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    res.status(500).json({ message: error.message });
  }
});

// Route de test pour vérifier toutes les cartes sauvegardées
router.get('/debug', async (req, res) => {
  try {
    const allSavedCards = await SavedCard.find()
      .populate('userId', 'name');
    
    console.log('Toutes les cartes sauvegardées:', JSON.stringify(allSavedCards, null, 2));
    res.json(allSavedCards);
  } catch (error) {
    console.error('Erreur lors de la récupération des cartes sauvegardées:', error);
    res.status(500).json({ message: error.message });
  }
});

// Nouvelle route pour récupérer les cartes sauvegardées d'une catégorie pour un utilisateur
router.get('/user/:userId/category/:category', async (req, res) => {
  const { userId, category } = req.params;
  console.log('API GET /user/:userId/category/:category', { userId, category });
  try {
    const cards = await SavedCard.find({
      userId,
      category: category.toLowerCase()
    });
    console.log('Cartes trouvées pour cette catégorie:', cards.length);
    res.json(cards);
  } catch (error) {
    console.error('Erreur dans /user/:userId/category/:category:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 