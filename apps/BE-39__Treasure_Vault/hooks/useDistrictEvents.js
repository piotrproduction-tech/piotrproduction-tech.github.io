// Hook do subskrypcji zdarzeń dzielnicy Treasure Vault (BE-39)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
