// Hook do subskrypcji zdarzeń dzielnicy Innovation And Business (BE-04)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
