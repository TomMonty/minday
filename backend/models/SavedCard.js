const mongoose = require('mongoose');

const savedCardSchema = new mongoose.Schema({
  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  fullDescription: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['histoire', 'sciences', 'geographie', 'art', 'medias', 'sports']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  savedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index composé pour éviter les doublons (même carte sauvegardée plusieurs fois par le même utilisateur)
savedCardSchema.index({ cardId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('SavedCard', savedCardSchema); 