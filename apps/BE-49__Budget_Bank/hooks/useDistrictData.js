// Hook do danych dzielnicy Budget Bank (BE-49)
export function useDistrictData() {
  return { items: [] };
}



export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/be-49/events")
  };
}
