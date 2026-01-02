// Hook do danych dzielnicy DAO Town Hall (BE-30)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-30/events")
  };
}
