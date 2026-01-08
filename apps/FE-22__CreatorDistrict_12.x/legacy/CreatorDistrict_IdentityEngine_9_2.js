// CreatorDistrict — DistrictIdentityEngine_9_2
// Nakładka na 9.1 z emergent identity 9.2.

import { CreatorDistrict_IdentityEngine_9_1 } from "./CreatorDistrict_IdentityEngine_9_1.js";
import { CreatorDistrict_EmergentState_9_2 } from "../models/CreatorDistrict_EmergentState_9_2.js";
import { CreatorDistrict_LongTermMemory_9_2 } from "../models/CreatorDistrict_LongTermMemory_9_2.js";
import { CreatorDistrict_ArchetypeEvolver_9_2 } from "../models/CreatorDistrict_ArchetypeEvolver_9_2.js";

export class CreatorDistrict_IdentityEngine_9_2 {
  constructor(baseArchetype = "BASE") {
    this.baseEngine = new CreatorDistrict_IdentityEngine_9_1();
    this.emergent = new CreatorDistrict_EmergentState_9_2();
    this.longTerm = new CreatorDistrict_LongTermMemory_9_2();
    this.evolver = new CreatorDistrict_ArchetypeEvolver_9_2(baseArchetype);
  }

  handleEvent(event, context = {}) {
    const result = this.baseEngine.handleEvent(event, context);

    // sygnały emergentne
    const signals = [];

    if (result.type === "TABOO_TRIGGERED") {
      signals.push({ type: "TABOO_TRIGGERED", weight: 1.0, source: "identity" });
    }
    if (result.type === "TABOO_SOFTENED") {
      signals.push({ type: "TABOO_TRIGGERED", weight: 0.5, source: "identity" });
    }
    if (event.type.startsWith("street.")) {
      signals.push({ type: "STREET_EVENT", weight: 0.5, source: "street" });
    }
    if (event.type.startsWith("creator.")) {
      signals.push({ type: "CREATOR_EVENT", weight: 0.5, source: "creator" });
    }
    if (event.type.startsWith("marketplace.")) {
      signals.push({ type: "MARKETPLACE_EVENT", weight: 0.5, source: "marketplace" });
    }
    if (event.type.includes("boost") || event.type.includes("highlight")) {
      signals.push({ type: "HYPE_EVENT", weight: 0.7, source: "street" });
    }

    signals.forEach(s => this.emergent.applySignal(s));
    this.longTerm.record(event, result);

    this.evolver.update(this.longTerm.getSnapshot(), this.emergent.snapshot());

    result.emergentState = this.emergent.snapshot();
    result.longTermMemory = this.longTerm.getSnapshot();
    result.archetype = this.evolver.getArchetype();

    return result;
  }
}
