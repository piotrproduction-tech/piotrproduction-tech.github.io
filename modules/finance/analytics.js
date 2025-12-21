// ===============================================
// CityOfGATE — FINANCE ANALYTICS (FE‑02)
// WERSJA 1.0
// ===============================================

export function initModule() {
    SystemLog.log("Analytics", "info", "Moduł Finance Analytics został uruchomiony");

    const elBudget = document.getElementById("analyticsBudget");
    const elVault = document.getElementById("analyticsVault");
    const elInvoices = document.getElementById("analyticsInvoices");
    const elPayments = document.getElementById("analyticsPayments");
    const elActivity = document.getElementById("analyticsActivity");

    if (!elBudget || !elVault || !elInvoices || !elPayments || !elActivity) {
        SystemLog.log("Analytics", "error", "Brak elementów HTML modułu");
        return;
    }

    // Mock danych analitycznych
    const analytics = {
        budgetBalance: 125000 - 48200,
        vaultValue: 78000,
        invoicesTotal: 4200 + 1800 + 900,
        paymentsTotal: 3200 + 1800 + 900,
        activity: [
            "Opłacono fakturę INV-002",
            "Dodano płatność P-004",
            "Zaktualizowano wartość Vault",
            "Zaksięgowano wpływ grantu technologicznego"
        ]
    };

    // Render wartości
    elBudget.textContent = analytics.budgetBalance + " PLN";
    elVault.textContent = analytics.vaultValue + " PLN";
    elInvoices.textContent = analytics.invoicesTotal + " PLN";
    elPayments.textContent = analytics.paymentsTotal + " PLN";

    // Render aktywności
    elActivity.innerHTML = analytics.activity
        .map(a => `<li>${a}</li>`)
        .join("");

    SystemLog.log("Analytics", "info", "Dane analityczne zostały wyrenderowane");
}
