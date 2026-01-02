// Hook do subskrypcji zdarzeń dzielnicy Marketplace (BE-21)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
