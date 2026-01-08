/**
 * Security Rules — Marketplace 5.0
 * Zasady anty-abuse i scoring ryzyka
 */

export const MarketplaceSecurityRules = {
  maxTransactionsPerHour: 50,
  suspiciousPriceChange: 0.4,
  duplicateListingWindowMinutes: 10,
  highRiskCountries: [],
};