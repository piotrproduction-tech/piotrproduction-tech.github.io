// Hook do danych dzielnicy Immersive VR Layer (BE-37)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-37/events")
  };
}
