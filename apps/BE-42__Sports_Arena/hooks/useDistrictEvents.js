// Hook do subskrypcji zdarzeń dzielnicy Sports Arena (BE-42)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
