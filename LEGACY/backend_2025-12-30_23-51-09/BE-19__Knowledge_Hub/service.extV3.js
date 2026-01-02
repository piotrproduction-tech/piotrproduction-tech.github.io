// ==== Historia zasobów ====
export function Knowledge_getResourceHistory(resourceId) {
  return [
    { id: "kn_hist_01", resourceId, action: "Dodano zasób", date: "2026-08-01" },
    { id: "kn_hist_02", resourceId, action: "Powiązano z kursem", date: "2026-08-10" }
  ];
}
