const mongoose = require('mongoose');
const Card = require('./models/Card');
const axios = require('axios');
require('dotenv').config();

async function getArticleImages(title) {
  try {
    // Récupérer les images de l'article
    const response = await axios.get(`https://fr.wikipedia.org/w/api.php`, {
      params: {
        action: 'query',
        titles: title,
        prop: 'images',
        format: 'json',
        origin: '*'
      }
    });

    const pages = response.data.query.pages;
    const pageId = Object.keys(pages)[0];
    const images = pages[pageId].images || [];

    // Filtrer pour ne garder que les images (pas les fichiers SVG, etc.)
    const imageFiles = images.filter(img => 
      img.title.toLowerCase().endsWith('.jpg') || 
      img.title.toLowerCase().endsWith('.jpeg') || 
      img.title.toLowerCase().endsWith('.png')
    );

    if (imageFiles.length > 0) {
      // Récupérer l'URL de la première image
      const imageTitle = imageFiles[0].title.replace('File:', '');
      const imageInfoResponse = await axios.get(`https://fr.wikipedia.org/w/api.php`, {
        params: {
          action: 'query',
          titles: imageTitle,
          prop: 'imageinfo',
          iiprop: 'url',
          format: 'json',
          origin: '*'
        }
      });

      const imagePages = imageInfoResponse.data.query.pages;
      const imagePageId = Object.keys(imagePages)[0];
      return imagePages[imagePageId].imageinfo[0].url;
    }
    return null;
  } catch (error) {
    console.error('Erreur lors de la récupération des images:', error);
    return null;
  }
}

async function getRandomWikipediaArticle(category) {
  try {
    // Obtenir un article aléatoire de Wikipedia
    const response = await axios.get('https://fr.wikipedia.org/api/rest_v1/page/random/summary');
    const article = response.data;
    
    // Récupérer les images de l'article
    const imageUrl = await getArticleImages(article.title);
    
    return {
      title: article.title,
      subtitle: article.description || 'Article Wikipédia',
      shortDescription: article.extract.split('. ').slice(0, 2).join('. ') + '.',
      fullDescription: article.extract,
      category: category,
      imageUrl: imageUrl || article.thumbnail?.source || `https://source.unsplash.com/random/800x600?${encodeURIComponent(article.title)}`
    };
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article Wikipedia:', error);
    return null;
  }
}

async function generateCards() {
  try {
    // Connexion à MongoDB Atlas
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connecté à MongoDB Atlas');

    // Supprimer uniquement les cartes de la collection cards
    await Card.deleteMany({});
    console.log('Cartes existantes supprimées (sauf savedCards)');

    const categories = [
      { name: 'histoire', count: 8 },
      { name: 'sciences', count: 8 },
      { name: 'geographie', count: 8 },
      { name: 'art', count: 8 },
      { name: 'medias', count: 8 },
      { name: 'sports', count: 8 }
    ];

    for (const category of categories) {
      console.log(`\nGénération des cartes pour la catégorie: ${category.name}`);
      const cards = [];

      for (let i = 0; i < category.count; i++) {
        const card = await getRandomWikipediaArticle(category.name);
        if (card) {
          cards.push(card);
        }
      }

      if (cards.length > 0) {
        await Card.insertMany(cards);
        console.log(`${cards.length} cartes insérées pour ${category.name}`);
      }
    }

    console.log('\nGénération des cartes terminée');
    mongoose.connection.close();
  } catch (error) {
    console.error('Erreur:', error);
    mongoose.connection.close();
  }
}

generateCards(); 