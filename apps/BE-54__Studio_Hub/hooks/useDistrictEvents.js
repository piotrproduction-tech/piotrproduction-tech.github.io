// Hook do subskrypcji zdarzeń dzielnicy Studio Hub (BE-54)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
