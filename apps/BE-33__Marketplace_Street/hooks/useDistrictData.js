// Hook do danych dzielnicy Marketplace Street (BE-33)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-33/events")
  };
}
