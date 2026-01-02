// Hook do subskrypcji zdarzeń dzielnicy Immersive VR Layer (BE-37)
export function useDistrictEvents() {
  return [];
}



export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
