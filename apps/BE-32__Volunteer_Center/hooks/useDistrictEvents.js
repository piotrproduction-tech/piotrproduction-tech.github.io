// Hook do subskrypcji zdarzeń dzielnicy Volunteer Center (BE-32)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
