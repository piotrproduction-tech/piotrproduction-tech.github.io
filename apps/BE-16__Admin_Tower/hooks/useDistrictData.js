// Hook do danych dzielnicy Admin Tower (BE-16)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-16/events")
  };
}
