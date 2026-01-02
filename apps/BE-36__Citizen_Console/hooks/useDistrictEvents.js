// Hook do subskrypcji zdarzeń dzielnicy Citizen Console (BE-36)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
