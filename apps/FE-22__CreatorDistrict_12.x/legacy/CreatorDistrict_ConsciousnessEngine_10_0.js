// CreatorDistrict — DistrictConsciousnessEngine_10_0
// Nakładka na 9.2: dzielnica reaguje na sygnały innych dzielnic.

import { CreatorDistrict_IdentityEngine_9_2 } from "./CreatorDistrict_IdentityEngine_9_2.js";
import { CreatorDistrict_Relations_10_0 } from "../models/CreatorDistrict_Relations_10_0.js";
import { CreatorDistrict_CoalitionEngine_10_0 } from "../models/CreatorDistrict_CoalitionEngine_10_0.js";
import { districtConsciousnessBus } from "../../DistrictConsciousnessBus_10_0.js";

export class CreatorDistrict_ConsciousnessEngine_10_0 {
  constructor() {
    this.identity = new CreatorDistrict_IdentityEngine_9_2("CreatorDistrict");
    this.relations = new CreatorDistrict_Relations_10_0();
    this.coalitions = new CreatorDistrict_CoalitionEngine_10_0(this.relations);

    districtConsciousnessBus.subscribe(signal => {
      if (signal.source !== "CreatorDistrict") {
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
