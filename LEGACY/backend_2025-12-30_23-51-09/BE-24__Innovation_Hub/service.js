// backend/BE-24/service.js

// Dane w pamięci (placeholder)
let SPONSOR_TIERS = ["Bronze","Silver","Gold","Platinum"];
let SPONSOR_CAMPAIGNS = [
  { id: "camp_01", name: "Festiwal VR 2026", budget: 20000 },
  { id: "camp_02", name: "Mentoring młodzieży", budget: 10000 }
];
let SPONSOR_INVOICES = [];
let SPONSOR_REPORTS = [];
let SPONSOR_PERKS = {
  Bronze: ["Logo na stronie"],
  Silver: ["Logo + stoisko"],
  Gold: ["Logo + stoisko + warsztat"],
  Platinum: ["Pełny pakiet + VR przestrzeń"]
};

// ===== Sponsoring: podstawowe =====

export function Sponsor_manageTiers() {
  return { tiers: SPONSOR_TIERS };
}

export function Sponsor_campaigns() {
  return SPONSOR_CAMPAIGNS;
}

export function Sponsor_reportsDetailed(range) {
  return {
    range: range || "30d",
    spend: 15000,
    reach: 300000,
    impressions: 120000
  };
}

export function Sponsor_invoices(userId) {
  return [
    { id: "inv_s_01", sponsor: userId, amount: 5000, status: "paid" },
    { id: "inv_s_02", sponsor: userId, amount: 7000, status: "pending" }
  ];
}

export function Sponsor_perks(tier) {
  return { tier, perks: SPONSOR_PERKS[tier] || [] };
}
