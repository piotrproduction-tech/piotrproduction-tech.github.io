// Hook do subskrypcji zdarzeń dzielnicy Knowledge Hub (BE-19)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
