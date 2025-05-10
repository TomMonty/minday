const mongoose = require('mongoose');
const Card = require('./models/Card');

const testCards = [
  {
    title: 'La Tour Eiffel',
    subtitle: 'Le symbole de Paris',
    shortDescription: 'Monument emblématique de Paris',
    fullDescription: 'La Tour Eiffel est une tour de fer puddlé de 324 mètres de hauteur située à Paris. Construite en deux ans par Gustave Eiffel et ses collaborateurs pour l\'Exposition universelle de Paris de 1889, elle est devenue le symbole de la capitale française.',
    imageUrl: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e',
    category: 'histoire'
  },
  {
    title: 'Le Big Bang',
    subtitle: 'L\'origine de l\'univers',
    shortDescription: 'Théorie sur l\'origine de l\'univers',
    fullDescription: 'Le Big Bang est le modèle cosmologique utilisé par les scientifiques pour décrire l\'origine et l\'évolution de l\'univers. Il stipule que l\'univers a commencé il y a environ 13,8 milliards d\'années à partir d\'un état extrêmement dense et chaud.',
    imageUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679',
    category: 'sciences'
  },
  {
    title: 'Le Mont Everest',
    subtitle: 'Le toit du monde',
    shortDescription: 'Plus haut sommet du monde',
    fullDescription: 'Le Mont Everest est le plus haut sommet du monde avec une altitude de 8 848 mètres. Il est situé dans la chaîne de l\'Himalaya, à la frontière entre le Népal et la Chine.',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
    category: 'geographie'
  }
];

mongoose.connect('mongodb://localhost:27017/minday')
  .then(async () => {
    console.log('Connecté à MongoDB');
    
    // Supprimer les cartes existantes
    await Card.deleteMany({});
    console.log('Cartes existantes supprimées');
    
    // Insérer les nouvelles cartes
    const cards = await Card.insertMany(testCards);
    console.log(`${cards.length} cartes insérées avec succès`);
    
    // Afficher les détails de la première carte
    console.log('Détails de la première carte:', JSON.stringify(cards[0], null, 2));
    
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Erreur:', error);
    mongoose.connection.close();
  }); 