// Hook do danych dzielnicy Admin Tower (BE-34)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-34/events")
  };
}
