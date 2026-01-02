// Hook do danych dzielnicy Stream Square (BE-22)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-22/events")
  };
}
