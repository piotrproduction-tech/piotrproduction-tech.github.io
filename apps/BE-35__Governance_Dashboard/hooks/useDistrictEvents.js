// Hook do subskrypcji zdarzeń dzielnicy Governance Dashboard (BE-35)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
