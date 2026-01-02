// Hook do subskrypcji zdarzeń dzielnicy Grants Office (BE-13)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
