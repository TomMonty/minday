const express = require('express');
const router = express.Router();
const QuizQuestion = require('../models/QuizzQuestion');

router.get('/', async (req, res) => {
  try {
    const quizQuestions = await QuizQuestion.find();
    res.json(quizQuestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
