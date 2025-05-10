require('dotenv').config();
const mongoose = require('mongoose');
const SavedCard = require('./models/SavedCard');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await SavedCard.deleteMany({});
    console.log('All saved cards deleted');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }); 