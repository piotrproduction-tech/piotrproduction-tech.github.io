// Hook do subskrypcji zdarzeń dzielnicy Finance And Admin (BE-02)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
