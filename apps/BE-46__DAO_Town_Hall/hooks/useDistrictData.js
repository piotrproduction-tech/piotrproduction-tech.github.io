// Hook do danych dzielnicy DAO Town Hall (BE-46)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-46/events")
  };
}
