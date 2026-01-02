// Hook do danych dzielnicy Admin Tower (BE-50)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-50/events")
  };
}
