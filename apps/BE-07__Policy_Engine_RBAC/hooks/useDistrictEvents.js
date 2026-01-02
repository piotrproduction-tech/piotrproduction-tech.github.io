// Hook do subskrypcji zdarzeń dzielnicy Policy Engine RBAC (BE-07)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
