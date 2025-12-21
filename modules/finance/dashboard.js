// ===============================================
// CityOfGATE — FINANCE DASHBOARD 2.0 (FE‑02)
// WERSJA 1.0
// ===============================================

export function initModule() {
    SystemLog.log("FinanceDashboard", "info", "Finance Dashboard 2.0 został uruchomiony");

    const elBudget = document.getElementById("fdBudget");
    const elVault = document.getElementById("fdVault");
    const elInvoices = document.getElementById("fdInvoices");
    const elPayments = document.getElementById("fdPayments");
    const elActivity = document.getElementById("fdActivity");

    if (!elBudget || !elVault || !elInvoices || !elPayments || !elActivity) {
        SystemLog.log("FinanceDashboard", "error", "Brak elementów HTML modułu");
        return;
    }

    // Mock danych — spójne z innymi modułami
    const data = {
        budgetBalance: 125000 - 48200 - 3200,
        vaultValue: 78000,
        invoicesTotal: 4200 + 1800 + 900,
        paymentsTotal: 3200 + 1800 + 900,
        activity: [
            "Opłacono fakturę INV-002",
            "Dodano płatność P-004",
            "Zaktualizowano wartość Vault",
            "Zaksięgowano wpływ grantu technologicznego",
            "Otworzono moduł Analytics"
        ]
    };

    // Render
    elBudget.textContent = data.budgetBalance + " PLN";
    elVault.textContent = data.vaultValue + " PLN";
    elInvoices.textContent = data.invoicesTotal + " PLN";
    elPayments.textContent = data.paymentsTotal + " PLN";

    elActivity.innerHTML = data.activity
        .map(a => `<li>${a}</li>`)
        .join("");

    SystemLog.log("FinanceDashboard", "info", "Finance Dashboard 2.0 wyrenderowany");
}
