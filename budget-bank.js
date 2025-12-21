console.log("[BudgetBank] Module loaded");

// ✅ Jeśli API_BASE już jest gotowe → startujemy od razu
if (API_BASE) {
  console.log("[BudgetBank] API_BASE already ready:", API_BASE);
  initBudgetBank();
} else {
  // ✅ Jeśli nie → czekamy na event
  document.addEventListener("api-ready", () => {
    console.log("[BudgetBank] API_BASE ready after event:", API_BASE);
    initBudgetBank();
  });
}

function initBudgetBank() {
  console.log("[BudgetBank] Initializing module...");

  if (!API_BASE) {
    console.error("[BudgetBank] ERROR — API_BASE is missing");
    return;
  }

  loadBankData();
}

async function loadBankData() {
  console.log("[BudgetBank] Fetching bank data...");

  const data = await api_get("finance/bank");

  console.log("[BudgetBank] Data received:", data);

  // ✅ tutaj wstawisz renderowanie tabeli, salda itd.
}
