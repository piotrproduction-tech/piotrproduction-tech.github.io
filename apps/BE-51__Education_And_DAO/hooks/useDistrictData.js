// Hook do danych dzielnicy Education And DAO (BE-51)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-51/events")
  };
}
