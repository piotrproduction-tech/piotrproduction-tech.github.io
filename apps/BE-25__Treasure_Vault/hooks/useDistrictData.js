// Hook do danych dzielnicy Treasure Vault (BE-25)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-25/events")
  };
}
