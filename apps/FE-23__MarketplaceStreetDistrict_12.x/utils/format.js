export function formatDate(ts) {
    return new Date(ts).toISOString();
  }

  export function formatNumber(n) {
    return new Intl.NumberFormat("en-US").format(n);
  }

