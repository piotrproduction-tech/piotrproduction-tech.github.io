const BASE = "/api/district";

export async function getDistrictItems() {
  const res = await fetch(`${BASE}/items`);
  return res.json();
}

export async function createDistrictItem(payload) {
  const res = await fetch(`${BASE}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function getDistrictItemDetails(id) {
  const res = await fetch(`${BASE}/items/${id}`);
  return res.json();
}

export async function getDistrictStats() {
  const res = await fetch(`${BASE}/stats`);
  return res.json();
}
