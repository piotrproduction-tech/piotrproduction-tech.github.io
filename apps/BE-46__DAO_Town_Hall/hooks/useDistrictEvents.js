// Hook do subskrypcji zdarzeń dzielnicy DAO Town Hall (BE-46)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
