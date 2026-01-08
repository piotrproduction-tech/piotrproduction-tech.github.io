// apps/index.js

import { bootstrapDistrict as FE21 } from "./FE-21__MarketplaceDistrict_12.x/index.js";
import { bootstrapDistrict as FE22 } from "./FE-22__CreatorDistrict_12.x/index.js";
import { bootstrapDistrict as FE23 } from "./FE-23__MarketplaceStreetDistrict_12.x/index.js";

export const districts = [
  FE21(),
  FE22(),
  FE23()
];

