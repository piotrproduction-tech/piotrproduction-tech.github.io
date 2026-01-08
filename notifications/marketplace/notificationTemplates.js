/**
 * Marketplace Notification Templates 5.0
 */

export const MarketplaceNotificationTemplates = {
  drop: (item) => `Nowy drop: ${item.title}`,
  flashSale: (item) => `Flash Sale: ${item.title}`,
  event: (event) => `Nowe wydarzenie: ${event.type}`,
  progression: (level) => `Awansowałeś na poziom ${level}`
};