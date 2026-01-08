/**
 * Marketplace Notification Engine 5.0
 */

export const MarketplaceNotificationEngine = {
  sendPush(userId, payload) {
    return { sent: true, userId, payload };
  },

  sendInApp(userId, payload) {
    return { sent: true, userId, payload };
  },

  notifyDrop(userId, drop) {
    return { sent: true, type: "drop", drop };
  },

  notifyFlashSale(userId, sale) {
    return { sent: true, type: "flashSale", sale };
  },

  notifyEvent(userId, event) {
    return { sent: true, type: "event", event };
  },

  notifyProgression(userId, progression) {
    return { sent: true, type: "progression", progression };
  }
};