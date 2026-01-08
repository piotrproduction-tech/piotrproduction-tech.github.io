/**
 * Marketplace Developer Tools 5.0
 * Narzędzia dla twórców i testerów:
 *  - szybkie generowanie danych
 *  - szybkie resetowanie świata
 *  - szybkie symulacje
 *  - szybkie inspekcje
 */

export const MarketplaceDevTools = {
  generateMockItems(count = 5) {
    return Array.from({ length: count }).map((_, i) => ({
      id: "mock_item_" + i,
      title: "Mock Item " + i
    }));
  },

  generateMockUsers(count = 3) {
    return Array.from({ length: count }).map((_, i) => ({
      id: "mock_user_" + i,
      name: "User " + i
    }));
  },

  resetWorld() {
    return { reset: true, timestamp: Date.now() };
  },

  simulateActivity(users, items) {
    return {
      events: users.map(u => ({
        userId: u.id,
        itemId: items[Math.floor(Math.random() * items.length)].id
      }))
    };
  }
};