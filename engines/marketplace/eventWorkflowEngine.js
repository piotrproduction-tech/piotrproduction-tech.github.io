/**
 * Marketplace Event Workflow Engine 5.0
 * Rola:
 *  - dropy
 *  - flash sale
 *  - premiery
 *  - eventy uliczne
 *  - eventy twórców
 */

export const MarketplaceEventWorkflowEngine = {
  runDrop(drop) {
    return { executed: true };
  },

  runFlashSale(event) {
    return { executed: true };
  },

  runCreatorEvent(event) {
    return { executed: true };
  },

  runStreetEvent(event) {
    return { executed: true };
  },

  orchestrate(event) {
    return { orchestrated: true };
  }
};