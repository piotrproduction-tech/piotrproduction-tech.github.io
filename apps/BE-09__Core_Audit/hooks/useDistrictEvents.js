// Hook do subskrypcji zdarzeń dzielnicy Core Audit (BE-09)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
