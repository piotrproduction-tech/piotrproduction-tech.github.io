// Hook do subskrypcji zdarzeń dzielnicy Sports Arena (BE-27)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
