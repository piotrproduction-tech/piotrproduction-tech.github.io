// Hook do subskrypcji zdarzeń dzielnicy Admin Tower (BE-34)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
