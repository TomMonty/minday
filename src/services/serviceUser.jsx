/**
 * serviceUser.js - Mock API for user-related operations
 * 
 * Example usage:
 * import { saveProfile } from '../services/serviceUser';
 * 
 * const profileData = {
 *   name: 'Alex Johnson',
 *   bio: 'L\'histoire du monde, L\'évolution artificielle, Avancés science',
 *   location: 'San Francisco, CA',
 *   avatarUrl: 'https://example.com/avatar.jpg',
 * };
 * 
 * saveProfile(profileData)
 *   .then(response => {
 *     if (response.status === 'success') {
 *       console.log('Profile saved:', response.data);
 *     }
 *   })
 *   .catch(error => console.error('Failed to save profile:', error));
 */

// Mock user data
let mockUserProfile = {
  name: "Alex Johnson",
  bio: "L'histoire du monde, L'évolution artificielle, Avancés science",
  location: "San Francisco, CA",
  avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
  preferences: {
    dailyCardCount: 5,
    categories: ["histoire", "sciences", "art"],
    notifications: true
  },
  stats: {
    cardsLearned: 124,
    challengesWon: 15,
    dayStreak: 7
  }
};

/**
 * Returns a promise that resolves after saving the user profile
 * @param {Object} data - User profile data to save
 * @returns {Promise<{status: string, data: Object}>}
 */
export const saveProfile = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Simulate validation
        if (!data || typeof data !== 'object') {
          resolve({
            status: "error",
            message: "Invalid profile data",
            data: null
          });
          return;
        }

        // Update mock profile with new data
        mockUserProfile = {
          ...mockUserProfile,
          ...data,
          // Keep nested objects if not provided in the update
          preferences: {
            ...mockUserProfile.preferences,
            ...(data.preferences || {})
          },
          stats: {
            ...mockUserProfile.stats,
            ...(data.stats || {})
          }
        };
        
        // In a real app, would persist to localStorage or send to server
        // Let's actually save to localStorage for demo purposes
        try {
          localStorage.setItem('min-day-profile', JSON.stringify(mockUserProfile));
        } catch (e) {
          console.warn("Failed to save profile to localStorage", e);
        }
        
        resolve({
          status: "success",
          data: mockUserProfile
        });
      } catch (error) {
        console.error("Error saving user profile:", error);
        reject({
          status: "error",
          message: "Failed to save profile"
        });
      }
    }, 400);
  });
};

/**
 * Returns a promise that resolves with the current user profile
 * @returns {Promise<{status: string, data: Object}>}
 */
export const getProfile = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        // Try to get from localStorage first
        const storedProfile = localStorage.getItem('min-day-profile');
        let profile = mockUserProfile;
        
        if (storedProfile) {
          try {
            profile = JSON.parse(storedProfile);
          } catch (e) {
            console.warn("Failed to parse profile from localStorage", e);
          }
        }
        
        resolve({
          status: "success",
          data: profile
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
        resolve({
          status: "error",
          message: "Failed to fetch profile",
          data: mockUserProfile // Fallback to mock data
        });
      }
    }, 400);
  });
};

/**
 * Updates user stats (cards learned, challenges won, day streak)
 * @param {Object} statsUpdate - Stats to update
 * @returns {Promise<{status: string, data: Object}>}
 */
export const updateStats = (statsUpdate) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        // Update stats
        mockUserProfile.stats = {
          ...mockUserProfile.stats,
          ...statsUpdate
        };
        
        // Save to localStorage
        try {
          localStorage.setItem('min-day-profile', JSON.stringify(mockUserProfile));
        } catch (e) {
          console.warn("Failed to save updated stats to localStorage", e);
        }
        
        resolve({
          status: "success",
          data: mockUserProfile.stats
        });
      } catch (error) {
        console.error("Error updating user stats:", error);
        resolve({
          status: "error",
          message: "Failed to update stats",
          data: mockUserProfile.stats
        });
      }
    }, 400);
  });
};
