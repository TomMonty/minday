const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Card = require('./models/Card');
const User = require('./models/User');
const SavedCard = require('./models/SavedCard');

// Sample data
const cards = [
  {
    title: "La Tour Eiffel",
    subtitle: "Monument emblématique de Paris",
    shortDescription: "Symbole de Paris et de la France, la Tour Eiffel est une tour de fer puddlé de 324 mètres de hauteur.",
    fullDescription: "La Tour Eiffel est une tour de fer puddlé de 324 mètres de hauteur située à Paris, à l'extrémité nord-ouest du parc du Champ-de-Mars en bordure de la Seine dans le 7e arrondissement. Construite en deux ans par Gustave Eiffel et ses collaborateurs pour l'Exposition universelle de Paris de 1889, elle est devenue le symbole de la capitale française et un site touristique de premier plan. Sa construction a été un véritable défi technique pour l'époque, utilisant plus de 18 000 pièces de fer et 2,5 millions de rivets. Aujourd'hui, elle accueille plus de 7 millions de visiteurs par an.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/330px-Tour_Eiffel_Wikimedia_Commons.jpg",
    category: "histoire"
  },
  {
    title: "La Photosynthèse",
    subtitle: "Comment les plantes produisent leur énergie",
    shortDescription: "Processus vital qui permet aux plantes de convertir la lumière solaire en énergie chimique.",
    fullDescription: "La photosynthèse est le processus bioénergétique qui permet aux plantes de synthétiser de la matière organique en utilisant l'énergie lumineuse. Ce processus complexe implique la conversion du dioxyde de carbone et de l'eau en glucose et en oxygène, grâce à l'énergie solaire captée par la chlorophylle. Ce mécanisme est fondamental pour la vie sur Terre car il produit l'oxygène que nous respirons et constitue la base de la chaîne alimentaire. Les plantes utilisent ensuite le glucose produit comme source d'énergie pour leur croissance et leur développement.",
    imageUrl: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=1000",
    category: "sciences"
  },
  {
    title: "Le Mont Everest",
    subtitle: "Le plus haut sommet du monde",
    shortDescription: "Point culminant de la Terre avec ses 8 848 mètres d'altitude, situé dans l'Himalaya.",
    fullDescription: "Le mont Everest, aussi appelé Chomolungma en tibétain et Sagarmatha en népalais, est le point culminant de la Terre avec une altitude de 8 848 mètres. Situé dans la chaîne de l'Himalaya, à la frontière entre le Népal et la Chine, il représente un défi majeur pour les alpinistes du monde entier. Sa première ascension réussie date de 1953 par Edmund Hillary et Tenzing Norgay. Les conditions extrêmes, avec des températures pouvant descendre jusqu'à -60°C et des vents dépassant 200 km/h, en font l'une des expéditions les plus périlleuses au monde.",
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1000",
    category: "geographie"
  },
  {
    title: "La Joconde",
    subtitle: "Le célèbre portrait de Léonard de Vinci",
    shortDescription: "Portrait mystérieux peint par Léonard de Vinci, exposé au musée du Louvre à Paris.",
    fullDescription: "La Joconde, ou Portrait de Mona Lisa, est un tableau de Léonard de Vinci réalisé entre 1503 et 1506. Ce portrait féminin est l'un des plus célèbres au monde, exposé au musée du Louvre à Paris. Son sourire énigmatique et son regard captivant continuent de fasciner les visiteurs et les chercheurs. La technique du sfumato utilisée par l'artiste, qui crée des transitions douces entre les couleurs, et le mystère entourant l'identité du modèle ont contribué à sa renommée mondiale. Le tableau a été volé en 1911 avant d'être retrouvé deux ans plus tard.",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000",
    category: "art"
  },
  {
    title: "Les Jeux Olympiques",
    subtitle: "La plus grande compétition sportive mondiale",
    shortDescription: "Compétition sportive internationale regroupant des milliers d'athlètes du monde entier.",
    fullDescription: "Les Jeux Olympiques sont un événement sportif international majeur regroupant les sports d'été et d'hiver, où des milliers d'athlètes s'affrontent dans différentes disciplines. Créés dans la Grèce antique, les Jeux modernes ont été rétablis par Pierre de Coubertin en 1896 et se déroulent tous les quatre ans. Ils représentent l'apogée de la carrière de nombreux athlètes et symbolisent l'excellence sportive, la fraternité et la paix entre les nations. Les Jeux Paralympiques, créés en 1960, permettent aux athlètes handicapés de participer à des compétitions de haut niveau.",
    imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1000",
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

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log('Connecté à MongoDB');

    try {
      // Clear existing data
      console.log('Suppression des données existantes...');
      await Card.deleteMany({});
      await User.deleteMany({});
      await SavedCard.deleteMany({});
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