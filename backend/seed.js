const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Card = require('./models/Card');
const User = require('./models/User');

// Sample data
const cards = [
  {
    title: "La Tour Eiffel",
    subtitle: "Monument emblématique de Paris",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/330px-Tour_Eiffel_Wikimedia_Commons.jpg",
    category: "histoire"
  },
  {
    title: "La Photosynthèse",
    subtitle: "Comment les plantes produisent leur énergie",
    imageUrl: "https://cdn.pixabay.com/photo/2016/04/15/04/02/water-1330252_1280.jpg",
    category: "sciences"
  },
  {
    title: "Le Mont Everest",
    subtitle: "Le plus haut sommet du monde",
    imageUrl: "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronaut-1867616_1280.jpg",
    category: "geographie"
  },
  {
    title: "La Joconde",
    subtitle: "Le célèbre portrait de Léonard de Vinci",
    imageUrl: "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg",
    category: "art"
  },
  {
    title: "Les Jeux Olympiques",
    subtitle: "La plus grande compétition sportive mondiale",
    imageUrl: "https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_1280.jpg",
    category: "sports"
  }
];

const defaultUser = {
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
};

// Connect to MongoDB
console.log('Tentative de connexion à MongoDB...');
console.log('URI MongoDB:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connexion à MongoDB réussie !');

    try {
      // Clear existing data
      console.log('Suppression des données existantes...');
      await Card.deleteMany({});
      await User.deleteMany({});
      console.log('Données existantes supprimées avec succès');

      // Insert new data
      console.log('Insertion des nouvelles données...');
      await Card.insertMany(cards);
      await User.create(defaultUser);
      console.log('Nouvelles données insérées avec succès');

      // Vérification
      const insertedCards = await Card.find();
      console.log('Vérification - Nombre de cartes dans la base:', insertedCards.length);
      console.log('Première carte insérée:', JSON.stringify(insertedCards[0], null, 2));

      console.log('Seed terminé avec succès !');
      process.exit(0);
    } catch (error) {
      console.error('Erreur lors du seed:', error);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('Erreur de connexion à MongoDB:', error);
    process.exit(1);
  }); 