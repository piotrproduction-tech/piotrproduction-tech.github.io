// Hook do danych dzielnicy Wellness Garden (BE-26)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-26/events")
  };
}
