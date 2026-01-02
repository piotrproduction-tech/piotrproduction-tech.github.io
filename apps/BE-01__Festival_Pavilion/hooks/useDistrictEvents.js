// Hook do subskrypcji zdarzeń dzielnicy Festival Pavilion (BE-01)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
