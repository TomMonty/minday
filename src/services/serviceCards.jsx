
/**
 * serviceCards.js - Mock API for card-related operations
 * 
 * Example usage:
 * import { getDailyCards } from '../services/serviceCards';
 * 
 * getDailyCards()
 *   .then(response => {
 *     if (response.status === 'success') {
 *       console.log('Daily cards:', response.data);
 *     }
 *   })
 *   .catch(error => console.error('Failed to fetch daily cards:', error));
 */

// Mock data
const mockCards = [
  {
    id: "card1",
    title: "Le Louvre",
    subtitle: "Le musée le plus visité au monde",
    image: "https://images.unsplash.com/photo-1546447147-3fc6b21ed14f",
    category: "art",
  },
  {
    id: "card2",
    title: "La Révolution française",
    subtitle: "Bouleversement majeur de l'histoire de France",
    image: "https://images.unsplash.com/photo-1537053910500-03b135dbde16",
    category: "histoire",
  },
  {
    id: "card3", 
    title: "La Théorie de la Relativité",
    subtitle: "Théorie physique d'Albert Einstein",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
    category: "sciences",
  },
  {
    id: "card4",
    title: "Le Mont Everest",
    subtitle: "La plus haute montagne du monde",
    image: "https://images.unsplash.com/photo-1516575869513-3f418f8902ca",
    category: "geographie",
  },
  {
    id: "card5",
    title: "La Joconde",
    subtitle: "Célèbre tableau de Léonard de Vinci",
    image: "https://images.unsplash.com/photo-1591779051696-1c3fa1469e79",
    category: "art",
  },
  {
    id: "card6",
    title: "La Seconde Guerre mondiale",
    subtitle: "Conflit militaire mondial de 1939 à 1945",
    image: "https://images.unsplash.com/photo-1541863138862-6395c7a67240",
    category: "histoire",
  },
  {
    id: "card7",
    title: "Le système solaire",
    subtitle: "Ensemble des objets célestes autour du Soleil",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9",
    category: "sciences",
  },
  {
    id: "card8",
    title: "Les Alpes",
    subtitle: "Une des plus grandes chaînes de montagnes d'Europe",
    image: "https://images.unsplash.com/photo-1515025617920-0d2d0eb8ee6a",
    category: "geographie",
  },
  {
    id: "card9",
    title: "La Coupe du Monde",
    subtitle: "Compétition internationale de football",
    image: "https://images.unsplash.com/photo-1617144519956-415f6e4c7bd9",
    category: "sports",
  },
  {
    id: "card10",
    title: "Le Cinéma Français",
    subtitle: "Histoire et influence du cinéma français",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
    category: "medias",
  },
];

/**
 * Returns a promise that resolves with 5 random cards
 * @returns {Promise<{status: string, data: Array}>}
 */
export const getDailyCards = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Shuffle array and take 5 random cards
        const shuffled = [...mockCards].sort(() => 0.5 - Math.random());
        const dailyCards = shuffled.slice(0, 5);
        
        resolve({
          status: "success",
          data: dailyCards
        });
      } catch (error) {
        console.error("Error fetching daily cards:", error);
        reject({
          status: "error",
          message: "Failed to fetch daily cards"
        });
      }
    }, 400);
  });
};
