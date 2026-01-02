// Hook do danych dzielnicy Business District (BE-48)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-48/events")
  };
}
