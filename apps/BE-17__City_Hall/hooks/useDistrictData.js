// Hook do danych dzielnicy City Hall (BE-17)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-17/events")
  };
}
