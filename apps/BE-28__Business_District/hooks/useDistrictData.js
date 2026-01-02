// Hook do danych dzielnicy Business District (BE-28)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-28/events")
  };
}
