// Hook do subskrypcji zdarzeń dzielnicy Innovation Hub (BE-40)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
