// Hook do subskrypcji zdarzeń dzielnicy Innovation Hub (BE-24)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
