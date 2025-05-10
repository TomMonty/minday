const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    let user = await User.findOne();
    
    if (!user) {
      // Create default user if none exists
      user = await User.create({
        name: "Default User",
        bio: "Welcome to Minday!",
        location: "Earth",
        avatarUrl: "/default-avatar.png",
        preferences: {
          dailyCardCount: 5,
          categories: ["histoire", "sciences", "geographie", "art"],
          notifications: true
        },
        stats: {
          cardsLearned: 0,
          challengesWon: 0,
          dayStreak: 0
        }
      });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
