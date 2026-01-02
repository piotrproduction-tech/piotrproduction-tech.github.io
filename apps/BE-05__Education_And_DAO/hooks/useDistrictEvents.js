// Hook do subskrypcji zdarzeń dzielnicy Education And DAO (BE-05)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
