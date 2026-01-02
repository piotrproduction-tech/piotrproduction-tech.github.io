// Hook do subskrypcji zdarzeń dzielnicy Culture Gallery (BE-41)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
