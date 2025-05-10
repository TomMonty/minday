const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function testGemini() {
  try {
    console.log('Test de connexion à l\'API Gemini...');
    console.log('Clé API utilisée:', process.env.GEMINI_API_KEY ? 'Présente' : 'Manquante');

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = "Dis-moi bonjour en français";
    
    console.log('Envoi de la requête...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Réponse reçue:', text);
    console.log('Test réussi !');
  } catch (error) {
    console.error('Erreur lors du test:', error);
    console.error('Détails de l\'erreur:', error.message);
    if (error.response) {
      console.error('Réponse de l\'API:', error.response.data);
    }
  }
}

testGemini(); 