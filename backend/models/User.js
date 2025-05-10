const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  bio: String,
  location: String,
  avatarUrl: String,
  preferences: {
    dailyCardCount: Number,
    categories: [String],
    notifications: Boolean
  },
  stats: {
    cardsLearned: Number,
    challengesWon: Number,
    dayStreak: Number
  }
});

module.exports = mongoose.model('User', UserSchema);
