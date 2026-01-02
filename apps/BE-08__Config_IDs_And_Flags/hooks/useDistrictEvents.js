// Hook do subskrypcji zdarzeń dzielnicy Config IDs And Flags (BE-08)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
