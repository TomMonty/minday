const mongoose = require('mongoose');

const QuizQuestionSchema = new mongoose.Schema({
  category: String,
  question: String,
  options: [String],
  correctAnswer: String,
  explanation: String
});

module.exports = mongoose.model('QuizQuestion', QuizQuestionSchema);
