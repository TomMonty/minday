require('dotenv').config();
const mongoose = require('mongoose');
const Card = require('./models/Card');

// Liste de tous les IDs à supprimer
const cardIds = [
  '681f8e6dfa8877be505f7386',
  '681f8e6dfa8877be505f7387',
  '681f8e6dfa8877be505f7388',
  '681f8e6dfa8877be505f7389',
  '681f8e6dfa8877be505f738a',
  '681f8e6dfa8877be505f738b',
  '681f8e6dfa8877be505f738c',
  '681f8e74fa8877be505f738e',
  '681f8e74fa8877be505f738f',
  '681f8e74fa8877be505f7390',
  '681f8e74fa8877be505f7391',
  '681f8e74fa8877be505f7392',
  '681f8e74fa8877be505f7393',
  '681f8e74fa8877be505f7394',
  '681f8e74fa8877be505f7395',
  '681f8e79fa8877be505f7397',
  '681f8e79fa8877be505f7398',
  '681f8e79fa8877be505f7399',
  '681f8e79fa8877be505f739a',
  '681f8e79fa8877be505f739b',
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    // Filtrer seulement les IDs valides
    const validObjectIds = cardIds.filter(id => mongoose.Types.ObjectId.isValid(id));
    
    const deleteResult = await Card.deleteMany({
      _id: { $in: validObjectIds }
    });

    console.log('Résultat suppression:', deleteResult);
    process.exit(0);
  })
  .catch(err => {
    console.error('Erreur de connexion ou de suppression:', err);
    process.exit(1);
  });
