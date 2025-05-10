const express = require('express');
const router = express.Router();
const Fact = require('../models/Fact');

router.get('/', async (req, res) => {
  try {
    const facts = await Fact.find();
    res.json(facts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
