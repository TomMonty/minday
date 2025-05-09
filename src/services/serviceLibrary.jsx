
/**
 * serviceLibrary.js - Mock API for library and fact-related operations
 * 
 * Example usage:
 * import { getFact, searchFacts } from '../services/serviceLibrary';
 * 
 * // Get a specific fact
 * getFact("fact1")
 *   .then(response => {
 *     if (response.status === 'success') {
 *       console.log('Fact details:', response.data);
 *     }
 *   });
 *
 * // Search for facts
 * searchFacts("peinture")
 *   .then(response => {
 *     if (response.status === 'success') {
 *       console.log('Search results:', response.data);
 *     }
 *   });
 */

// Mock data
const mockFacts = [
  {
    id: "fact1",
    title: "Le Louvre",
    subtitle: "Le musée le plus visité au monde",
    image: "https://images.unsplash.com/photo-1546447147-3fc6b21ed14f",
    category: "art",
    content: "Le Louvre est le plus grand musée d'art et d'antiquités au monde. Situé au cœur de Paris, il abrite environ 38 000 objets préhistoriques à modernes, exposés sur une superficie de 72 735 mètres carrés. La Joconde de Léonard de Vinci et la Vénus de Milo comptent parmi ses œuvres les plus célèbres.",
    sourceUrl: "https://www.louvre.fr",
    tags: ["art", "musée", "paris", "peinture", "sculpture"]
  },
  {
    id: "fact2",
    title: "La Révolution française",
    subtitle: "Bouleversement majeur de l'histoire de France",
    image: "https://images.unsplash.com/photo-1537053910500-03b135dbde16",
    category: "histoire",
    content: "La Révolution française est une période de bouleversements sociaux et politiques de grande envergure en France qui s'étend de 1789 à 1799. Elle a mis fin à la monarchie absolue, établi un régime républicain, puis consulaire, et profondément transformé la société française en abolissant les privilèges de l'Ancien Régime.",
    sourceUrl: "https://www.histoire-france.net",
    tags: ["histoire", "france", "révolution", "politique"]
  },
  {
    id: "fact3", 
    title: "La Théorie de la Relativité",
    subtitle: "Théorie physique d'Albert Einstein",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
    category: "sciences",
    content: "La théorie de la relativité, développée par Albert Einstein au début du XXe siècle, comprend la relativité restreinte (1905) et la relativité générale (1915). Elle révolutionne la compréhension de l'espace, du temps et de la gravitation, remettant en question les concepts classiques de la mécanique newtonienne.",
    sourceUrl: "https://www.science-universe.com",
    tags: ["science", "physique", "einstein", "relativité"]
  },
  {
    id: "fact4",
    title: "Le Mont Everest",
    subtitle: "La plus haute montagne du monde",
    image: "https://images.unsplash.com/photo-1516575869513-3f418f8902ca",
    category: "geographie",
    content: "Le mont Everest est le point culminant de la planète Terre, avec une altitude de 8 848,86 mètres. Situé dans la chaîne de l'Himalaya, à la frontière entre le Népal et la Chine, il porte le nom de Sir George Everest, un géographe britannique qui fut géomètre général des Indes de 1830 à 1843.",
    sourceUrl: "https://www.national-geographic.fr",
    tags: ["géographie", "montagne", "himalaya", "nepal", "chine"]
  },
  {
    id: "fact5",
    title: "La Joconde",
    subtitle: "Célèbre tableau de Léonard de Vinci",
    image: "https://images.unsplash.com/photo-1591779051696-1c3fa1469e79",
    category: "art",
    content: "La Joconde, ou Portrait de Monna Lisa, est une peinture à l'huile sur panneau de bois de peuplier réalisée entre 1503 et 1506 par Léonard de Vinci. Ce portrait représente une femme au sourire énigmatique, dont l'identité a fait l'objet de nombreuses hypothèses. Conservé au musée du Louvre à Paris, c'est l'un des tableaux les plus célèbres au monde.",
    sourceUrl: "https://www.louvre.fr/oeuvre-joconde",
    tags: ["art", "peinture", "de vinci", "renaissance", "portrait"]
  }
];

/**
 * Returns a promise that resolves with a specific fact by ID
 * @param {string} id - The fact ID to retrieve
 * @returns {Promise<{status: string, data: Object|null}>}
 */
export const getFact = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const fact = mockFacts.find(item => item.id === id);
        
        if (fact) {
          resolve({
            status: "success",
            data: fact
          });
        } else {
          resolve({
            status: "error",
            message: "Fact not found",
            data: null
          });
        }
      } catch (error) {
        console.error("Error fetching fact:", error);
        reject({
          status: "error",
          message: "Failed to fetch fact"
        });
      }
    }, 400);
  });
};

/**
 * Returns a promise that resolves with facts matching the search query
 * @param {string} query - Search query to match against fact titles, content, and tags
 * @returns {Promise<{status: string, data: Array}>}
 */
export const searchFacts = (query) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Convert query to lowercase for case-insensitive search
        const searchTerm = query.toLowerCase();
        
        const results = mockFacts.filter(fact => 
          fact.title.toLowerCase().includes(searchTerm) || 
          fact.content.toLowerCase().includes(searchTerm) || 
          fact.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        
        resolve({
          status: "success",
          data: results
        });
      } catch (error) {
        console.error("Error searching facts:", error);
        reject({
          status: "error",
          message: "Failed to search facts"
        });
      }
    }, 400);
  });
};
