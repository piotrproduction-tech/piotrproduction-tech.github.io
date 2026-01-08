import { MarketplaceStreetDistrict_StreetEngine_7_0 } from "../engines/MarketplaceStreetDistrict_StreetEngine_7_0.js";

const engine = new MarketplaceStreetDistrict_StreetEngine_7_0();
const exhibition = { glow: 0 };

engine.glowUp(exhibition, 3);
console.log("Street 7.0 glow test:", exhibition.glow);