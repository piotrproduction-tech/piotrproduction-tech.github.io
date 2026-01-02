// Hook do subskrypcji zdarzeń dzielnicy AI Companion (BE-38)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
