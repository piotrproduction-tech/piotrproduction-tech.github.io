// Hook do danych dzielnicy Policy Engine RBAC (BE-07)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-07/events")
  };
}
