/**
 * Marketplace Debug Console 2.0
 * Narzędzie do inspekcji świata Marketplace:
 *  - podgląd stanu świata
 *  - podgląd ticków
 *  - podgląd pogody
 *  - podgląd ekonomii
 *  - podgląd społeczności
 *  - podgląd sezonów
 */

import { MarketplaceDebugCommands } from "./debugCommands.js";

export const MarketplaceDebugConsole = {
  run(command, payload) {
    if (!MarketplaceDebugCommands[command]) {
      return { error: "Unknown command", command };
    }
    return MarketplaceDebugCommands[command](payload);
  }
};