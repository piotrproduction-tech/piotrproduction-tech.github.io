// Hook do danych dzielnicy Education And DAO (BE-05)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-05/events")
  };
}
