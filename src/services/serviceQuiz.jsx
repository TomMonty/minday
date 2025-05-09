
/**
 * serviceQuiz.js - Mock API for quiz-related operations
 * 
 * Example usage:
 * import { getQuestions } from '../services/serviceQuiz';
 * 
 * getQuestions("art", 3)
 *   .then(response => {
 *     if (response.status === 'success') {
 *       console.log('Quiz questions:', response.data);
 *     }
 *   })
 *   .catch(error => console.error('Failed to fetch questions:', error));
 */

// Mock quiz questions by category
const mockQuizQuestions = {
  art: [
    {
      id: "q1",
      question: "Qui a peint La Joconde ?",
      options: ["Léonard de Vinci", "Pablo Picasso", "Vincent van Gogh", "Michel-Ange"],
      correctAnswer: "Léonard de Vinci",
      explanation: "La Joconde a été peinte par Léonard de Vinci entre 1503 et 1506."
    },
    {
      id: "q2",
      question: "Dans quel musée est exposée La Nuit étoilée de Vincent van Gogh ?",
      options: ["Museum of Modern Art", "Musée d'Orsay", "Rijksmuseum", "National Gallery"],
      correctAnswer: "Museum of Modern Art",
      explanation: "La Nuit étoilée est exposée au Museum of Modern Art (MoMA) à New York."
    },
    {
      id: "q3",
      question: "Quel mouvement artistique est associé à Claude Monet ?",
      options: ["Impressionnisme", "Cubisme", "Surréalisme", "Pop Art"],
      correctAnswer: "Impressionnisme",
      explanation: "Claude Monet est l'un des fondateurs et représentants les plus connus de l'impressionnisme."
    },
    {
      id: "q4",
      question: "Qui a sculpté le David ?",
      options: ["Michel-Ange", "Donatello", "Leonardo da Vinci", "Bernini"],
      correctAnswer: "Michel-Ange",
      explanation: "Michel-Ange a sculpté le David entre 1501 et 1504."
    }
  ],
  histoire: [
    {
      id: "q5",
      question: "Quelle est la date de la prise de la Bastille ?",
      options: ["14 juillet 1789", "4 juillet 1776", "21 janvier 1793", "5 mai 1789"],
      correctAnswer: "14 juillet 1789",
      explanation: "La prise de la Bastille a eu lieu le 14 juillet 1789, événement marquant le début de la Révolution française."
    },
    {
      id: "q6",
      question: "Qui était le premier empereur des Français ?",
      options: ["Napoléon Bonaparte", "Louis XIV", "Charlemagne", "Louis XVI"],
      correctAnswer: "Napoléon Bonaparte",
      explanation: "Napoléon Bonaparte est devenu le premier empereur des Français le 18 mai 1804."
    },
    {
      id: "q7",
      question: "Quand a eu lieu la Seconde Guerre mondiale ?",
      options: ["1939-1945", "1914-1918", "1949-1955", "1929-1935"],
      correctAnswer: "1939-1945",
      explanation: "La Seconde Guerre mondiale s'est déroulée du 1er septembre 1939 au 2 septembre 1945."
    }
  ],
  sciences: [
    {
      id: "q8",
      question: "Quelle est la formule chimique de l'eau ?",
      options: ["H2O", "CO2", "O2", "H2O2"],
      correctAnswer: "H2O",
      explanation: "La formule chimique de l'eau est H2O, indiquant qu'une molécule d'eau est composée de deux atomes d'hydrogène et un atome d'oxygène."
    },
    {
      id: "q9",
      question: "Qui a formulé la théorie de la relativité ?",
      options: ["Albert Einstein", "Isaac Newton", "Marie Curie", "Niels Bohr"],
      correctAnswer: "Albert Einstein",
      explanation: "Albert Einstein a formulé la théorie de la relativité restreinte en 1905 et la théorie de la relativité générale en 1915."
    },
    {
      id: "q10",
      question: "Quel est l'élément chimique dont le numéro atomique est 1 ?",
      options: ["Hydrogène", "Hélium", "Carbone", "Azote"],
      correctAnswer: "Hydrogène",
      explanation: "L'hydrogène est l'élément chimique dont le numéro atomique est 1, ce qui signifie qu'il possède un seul proton."
    }
  ],
  geographie: [
    {
      id: "q11",
      question: "Quelle est la capitale de l'Australie ?",
      options: ["Canberra", "Sydney", "Melbourne", "Brisbane"],
      correctAnswer: "Canberra",
      explanation: "Canberra est la capitale de l'Australie depuis 1927."
    },
    {
      id: "q12",
      question: "Quel est le plus long fleuve du monde ?",
      options: ["Le Nil", "L'Amazone", "Le Mississippi", "Le Yangtsé"],
      correctAnswer: "Le Nil",
      explanation: "Le Nil est le plus long fleuve du monde avec une longueur d'environ 6 650 km."
    },
    {
      id: "q13",
      question: "À quelle chaîne de montagnes appartient le Mont Blanc ?",
      options: ["Les Alpes", "Les Pyrénées", "Les Carpates", "Les Andes"],
      correctAnswer: "Les Alpes",
      explanation: "Le Mont Blanc, avec ses 4 809 mètres, est le plus haut sommet des Alpes."
    }
  ],
  medias: [
    {
      id: "q14",
      question: "Qui est le réalisateur du film 'Pulp Fiction' ?",
      options: ["Quentin Tarantino", "Martin Scorsese", "Steven Spielberg", "Christopher Nolan"],
      correctAnswer: "Quentin Tarantino",
      explanation: "Pulp Fiction a été réalisé par Quentin Tarantino et est sorti en 1994."
    },
    {
      id: "q15",
      question: "En quelle année a été diffusé le premier épisode de la série 'Friends' ?",
      options: ["1994", "1990", "1996", "2000"],
      correctAnswer: "1994",
      explanation: "Le premier épisode de Friends a été diffusé le 22 septembre 1994."
    }
  ],
  sports: [
    {
      id: "q16",
      question: "Combien de joueurs composent une équipe de football sur le terrain ?",
      options: ["11", "10", "9", "12"],
      correctAnswer: "11",
      explanation: "Une équipe de football est composée de 11 joueurs sur le terrain."
    },
    {
      id: "q17",
      question: "Dans quel pays se sont déroulés les Jeux Olympiques d'été de 2016 ?",
      options: ["Brésil", "France", "Chine", "États-Unis"],
      correctAnswer: "Brésil",
      explanation: "Les Jeux Olympiques d'été de 2016 se sont déroulés à Rio de Janeiro, au Brésil."
    }
  ]
};

/**
 * Returns a promise that resolves with quiz questions for a specific category
 * @param {string} category - Category of questions to retrieve
 * @param {number} count - Number of questions to retrieve
 * @returns {Promise<{status: string, data: Array}>}
 */
export const getQuestions = (category, count) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Check if category exists
        if (!mockQuizQuestions[category]) {
          resolve({
            status: "error",
            message: `Category '${category}' not found`,
            data: []
          });
          return;
        }

        // Get questions for the specified category
        let questions = [...mockQuizQuestions[category]];
        
        // If count is specified and valid, limit the number of questions
        if (count && count > 0 && count < questions.length) {
          // Shuffle and take the requested number
          questions = questions.sort(() => 0.5 - Math.random()).slice(0, count);
        }
        
        resolve({
          status: "success",
          data: questions
        });
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
        reject({
          status: "error",
          message: "Failed to fetch quiz questions"
        });
      }
    }, 400);
  });
};
