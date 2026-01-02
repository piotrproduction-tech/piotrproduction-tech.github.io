// Hook do subskrypcji zdarzeń dzielnicy Wellness Garden (BE-43)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
