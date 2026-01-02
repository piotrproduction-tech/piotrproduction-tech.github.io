// Hook do subskrypcji zdarzeń dzielnicy City Hall (BE-17)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
