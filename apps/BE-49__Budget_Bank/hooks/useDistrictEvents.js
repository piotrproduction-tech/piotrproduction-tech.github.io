// Hook do subskrypcji zdarzeń dzielnicy Budget Bank (BE-49)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
