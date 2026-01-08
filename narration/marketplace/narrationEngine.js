/**
 * Marketplace Narration Engine 5.0
 * Rola:
 *  - generowanie opisów
 *  - narracja itemów
 *  - narracja twórców
 *  - narracja sklepów
 *  - narracja eventów
 */

export const MarketplaceNarrationEngine = {
  describeItem(item) {
    return `Item: ${item.title}`;
  },

  describeCreator(creator) {
    return `Creator: ${creator.name}`;
  },

  describeShop(shop) {
    return `Shop: ${shop.name}`;
  },

  describeEvent(event) {
    return `Event: ${event.type}`;
  }
};