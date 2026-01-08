import { CitySymbolismEngine } from "./citySymbolismEngine.js";
import { CityCulturalWavesEngine } from "./cityCulturalWavesEngine.js";
import { CityRitualEvolutionEngine } from "./cityRitualEvolutionEngine.js";
import { CityArtEngine } from "./cityArtEngine.js";
import { CityDiplomacyEngine } from "./cityDiplomacyEngine.js";
import { CityMigrationEngine } from "./cityMigrationEngine.js";
import { CityTradeEngine } from "./cityTradeEngine.js";
import { CityMacroEconomyEngine } from "./cityMacroEconomyEngine.js";
import { CityDestinyEngine } from "./cityDestinyEngine.js";
import { CityAutonomyEngine } from "./cityAutonomyEngine.js";
import { CityLawEngine } from "./cityLawEngine.js";
import { CityEthicsEngine } from "./cityEthicsEngine.js";
import { CityFutureVisionEngine } from "./cityFutureVisionEngine.js";
import { CityCollectiveMemoryEngine } from "./cityCollectiveMemoryEngine.js";
import { CityLegendsEngine } from "./cityLegendsEngine.js";
import { CityMythEngine } from "./cityMythEngine.js";
import { CityDreamEngine } from "./cityDreamEngine.js";
import { CityHarmonyEngine } from "./cityHarmonyEngine.js";
import { CityConflictEngine } from "./cityConflictEngine.js";
import { CitySocialNetworkEngine } from "./citySocialNetworkEngine.js";
import { CityRitualsEngine } from "./cityRitualsEngine.js";
import { CityEmotionalWeatherEngine } from "./cityEmotionalWeatherEngine.js";
import { CityArchetypeEvolutionEngine } from "./cityArchetypeEvolutionEngine.js";
import { CityMemoryGraphEngine } from "./cityMemoryGraphEngine.js";
import { CityNarrativeEngine } from "./cityNarrativeEngine.js";
import { CityIdentityEngine } from "./cityIdentityEngine.js";
import { CityCultureEngine } from "./cityCultureEngine.js";
import { CityEmotionEngine } from "./cityEmotionEngine.js";
/**
 * CITY INTELLIGENCE ENGINES
 * Brain • Memory • Trends • Prediction • Mood • Load
 */

export const CityMemoryEngine = {
  history: [],
  remember(snapshot) {
    this.history.push({ timestamp: Date.now(), snapshot });
    if (this.history.length > 1000) this.history.shift();
  },
  getHistory() {
    return this.history;
  }
};

export const CityTrendEngine = {
  computeTrends(city) {
    const trends = {
      economy: city.economy?.value ?? 0,
      mood: city.social?.mood ?? 0,
      events: Array.isArray(city.globalEvents) ? city.globalEvents.length : 0
    };
    city.trends = trends;
    return city;
  }
};

export const CityPredictionEngine = {
  predict(city) {
    const prediction = {
      economyFuture: (city.trends?.economy ?? 0) * 1.05,
      moodFuture: (city.trends?.mood ?? 0) * 1.02
    };
    city.prediction = prediction;
    return city;
  }
};

export const CityMoodEngine = {
  updateMood(city) {
    const base = city.social?.mood ?? 0;
    const events = Array.isArray(city.globalEvents) ? city.globalEvents.length : 0;
    city.cityMood = base + events * 0.01;
    return city;
  }
};

export const CityLoadBalancer = {
  balance(city) {
    if (!city.shards || typeof city.shards !== "object") return city;
    city.load = Object.entries(city.shards).map(([id, shard]) => ({
      id,
      load: Array.isArray(shard.entities) ? shard.entities.length : 0
    }));
    return city;
  }
};

export const CityBrainEngine = {
  tick(city, snapshotEngine, memoryEngine, trendEngine, predictionEngine, moodEngine, loadBalancer, world) {
    const snapshot = snapshotEngine.takeSnapshot(city);
    memoryEngine.remember(snapshot);

    // Wstrzykujemy dane świata do miasta
    city.economy = world.economy;
    city.social = world.social;
    city.globalEvents = world.events;

    city = trendEngine.computeTrends(city);
    city = predictionEngine.predict(city);
    city = moodEngine.updateMood(city);
    city = loadBalancer.balance(city);
    city = CityEmotionEngine.tick(city, world);
    city = CityCultureEngine.tick(city, world);
    city = CityIdentityEngine.tick(city, world);
    city = CityNarrativeEngine.tick(city, world);
    city = CityMemoryGraphEngine.tick(city, world);
    city = CityArchetypeEvolutionEngine.tick(city, world);
    city = CityEmotionalWeatherEngine.tick(city, world);
    city = CityRitualsEngine.tick(city, world);
    city = CitySocialNetworkEngine.tick(city, world);
    city = CityConflictEngine.tick(city, world);
    city = CityHarmonyEngine.tick(city, world);
    city = CityDreamEngine.tick(city, world);
    city = CityMythEngine.tick(city, world);
    city = CityLegendsEngine.tick(city, world);
    city = CityCollectiveMemoryEngine.tick(city, world);
    city = CityFutureVisionEngine.tick(city, world);
    city = CityEthicsEngine.tick(city, world);
    city = CityLawEngine.tick(city, world);
    city = CityAutonomyEngine.tick(city, world);
    city = CityDestinyEngine.tick(city, world);
    city = CityMacroEconomyEngine.tick(city, world);
    city = CityTradeEngine.tick(city, world);
    city = CityMigrationEngine.tick(city, world);
    city = CityDiplomacyEngine.tick(city, world);
    city = CityArtEngine.tick(city, world);
    city = CityRitualEvolutionEngine.tick(city, world);
    city = CityCulturalWavesEngine.tick(city, world);
    city = CitySymbolismEngine.tick(city, world);
    return city;
  }
};

