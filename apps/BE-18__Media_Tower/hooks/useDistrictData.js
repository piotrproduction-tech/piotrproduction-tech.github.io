// Hook do danych dzielnicy Media Tower (BE-18)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-18/events")
  };
}
