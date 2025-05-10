const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  imageUrl: String,
  category: String
});

module.exports = mongoose.model('Card', CardSchema);
