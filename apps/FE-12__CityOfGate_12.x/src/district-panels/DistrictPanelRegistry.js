// apps/FE-12__CityOfGate_12.x/src/district-panels/DistrictPanelRegistry.js

export const DistrictPanelRegistry = {
  marketplace: {
    panels: [
      {
        id: "marketplace-hud",
        name: "Marketplace HUD",
        path: "../../../FE-21__MarketplaceDistrict_12.x/panels/HUD.jsx"
      },
      {
        id: "marketplace-tools",
        name: "Marketplace Tools",
        path: "../../../FE-21__MarketplaceDistrict_12.x/panels/Tools.jsx"
      }
    ]
  },

  creator: {
    panels: [
      {
        id: "creator-hud",
        name: "Creator HUD",
        path: "../../../FE-22__CreatorDistrict_12.x/panels/HUD.jsx"
      }
    ]
  },

  street: {
    panels: [
      {
        id: "street-overlay",
        name: "Street Overlay",
        path: "../../../FE-23__MarketplaceStreetDistrict_12.x/panels/Overlay.jsx"
      }
    ]
  }
};
