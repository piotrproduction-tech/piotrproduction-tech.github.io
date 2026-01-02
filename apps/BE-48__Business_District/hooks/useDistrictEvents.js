// Hook do subskrypcji zdarzeń dzielnicy Business District (BE-48)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
