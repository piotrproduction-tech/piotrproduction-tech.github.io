// MarketplaceStreetDistrict — DistrictConsciousnessEngine_10_0
// Nakładka na 9.2: dzielnica reaguje na sygnały innych dzielnic.

import { MarketplaceStreetDistrict_IdentityEngine_9_2 } from "./MarketplaceStreetDistrict_IdentityEngine_9_2.js";
import { MarketplaceStreetDistrict_Relations_10_0 } from "../models/MarketplaceStreetDistrict_Relations_10_0.js";
import { MarketplaceStreetDistrict_CoalitionEngine_10_0 } from "../models/MarketplaceStreetDistrict_CoalitionEngine_10_0.js";
import { districtConsciousnessBus } from "../../DistrictConsciousnessBus_10_0.js";

export class MarketplaceStreetDistrict_ConsciousnessEngine_10_0 {
  constructor() {
    this.identity = new MarketplaceStreetDistrict_IdentityEngine_9_2("MarketplaceStreetDistrict");
    this.relations = new MarketplaceStreetDistrict_Relations_10_0();
    this.coalitions = new MarketplaceStreetDistrict_CoalitionEngine_10_0(this.relations);

    districtConsciousnessBus.subscribe(signal => {
      if (signal.source !== "MarketplaceStreetDistrict") {
        this.processExternalSignal(signal);
      }
    });
  }

  processExternalSignal(signal) {
    const { source, type, weight } = signal;

    if (type === "HYPE_EVENT") {
      this.relations.updateRelation(source, 0.05 * weight);
    }

    if (type === "TABOO_TRIGGERED") {
      this.relations.updateRelation(source, -0.1 * weight);
    }

    if (type === "CREATOR_EVENT") {
      this.relations.updateRelation(source, 0.03 * weight);
    }

    if (type === "MARKETPLACE_EVENT") {
      this.relations.updateRelation(source, 0.02 * weight);
    }

    // ⭐ NOWE — glow buduje relacje
    if (type === "STREET_GLOW_UPDATE") {
      this.relations.updateRelation(source, 0.05 * weight);
    }
  }

  handleEvent(event, context = {}) {
    const identityResult = this.identity.handleEvent(event, context);

    // Emitujemy sygnał do innych dzielnic
    districtConsciousnessBus.broadcast({
      source: this.identity.name,
      type: identityResult.type,
      weight: 1.0
    });

    // Zwracamy pełny snapshot 10.0
    return {
      emergentState: this.identity.emergentState,
      longTermMemory: this.identity.longTermMemory,
      relations: this.relations.snapshot(),
      coalitionMap: {
        MarketplaceDistrict: this.coalitions.evaluateCoalition("MarketplaceDistrict"),
        MarketplaceStreetDistrict: this.coalitions.evaluateCoalition("MarketplaceStreetDistrict"),
        CreatorDistrict: this.coalitions.evaluateCoalition("CreatorDistrict")
      },
      archetype: this.identity.archetype,
      type: identityResult.type
    };
  }
}
