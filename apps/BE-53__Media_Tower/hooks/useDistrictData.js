// Hook do danych dzielnicy Media Tower (BE-53)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-53/events")
  };
}
