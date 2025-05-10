const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function resetSavedCards() {
  try {
    // Connexion à MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connecté à MongoDB');

    // Supprimer la collection SavedCard
    await mongoose.connection.collection('savedcards').drop();
    console.log('Collection SavedCard supprimée');

    // Recréer la collection avec le nouveau schéma
    const SavedCard = require('./models/SavedCard');
    console.log('Collection SavedCard recréée avec le nouveau schéma');

    console.log('Réinitialisation terminée avec succès');
  } catch (error) {
    console.error('Erreur lors de la réinitialisation:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Déconnecté de MongoDB');
  }
}

resetSavedCards(); 