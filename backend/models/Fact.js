const mongoose = require('mongoose');

const FactSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  imageUrl: String,
  category: String,
  content: String,
  sourceUrl: String,
  tags: [String]
});

module.exports = mongoose.model('Fact', FactSchema);
