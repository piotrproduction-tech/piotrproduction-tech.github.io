// Hook do subskrypcji zdarzeń dzielnicy Community And Social (BE-03)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
