// Hook do danych dzielnicy Finance And Admin (BE-02)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-02/events")
  };
}
