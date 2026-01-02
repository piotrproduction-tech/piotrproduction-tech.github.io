// Hook do danych dzielnicy DAO Town Hall (BE-06)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-06/events")
  };
}
