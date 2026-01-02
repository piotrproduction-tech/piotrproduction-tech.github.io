// Hook do subskrypcji zdarzeń dzielnicy Media Tower (BE-18)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
