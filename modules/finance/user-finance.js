// ===============================================
// CityOfGATE — USER FINANCE CONSOLE (FE‑02)
// WERSJA 1.0
// ===============================================

export function initModule() {
    SystemLog.log("UserFinance", "info", "Moduł User Finance Console został uruchomiony");

    const elBalance = document.getElementById("ufBalance");
    const elLastPayment = document.getElementById("ufLastPayment");
    const elLastInvoice = document.getElementById("ufLastInvoice");
    const elGrants = document.getElementById("ufGrants");
    const elActivity = document.getElementById("ufActivity");

    if (!elBalance || !elLastPayment || !elLastInvoice || !elGrants || !elActivity) {
        SystemLog.log("UserFinance", "error", "Brak elementów HTML modułu");
        return;
    }

    // Mock danych użytkownika
    const userFinance = {
        balance: 125000 - 48200 - 3200,
        lastPayment: "P-004 — 900 PLN",
        lastInvoice: "INV-003 — 900 PLN",
        activeGrants: 3,
        activity: [
            "Dodano płatność P-004",
            "Oznaczono fakturę INV-002 jako opłaconą",
            "Zaksięgowano wpływ grantu edukacyjnego",
            "Zaktualizowano saldo użytkownika"
        ]
    };

    // Render wartości
    elBalance.textContent = userFinance.balance + " PLN";
    elLastPayment.textContent = userFinance.lastPayment;
    elLastInvoice.textContent = userFinance.lastInvoice;
    elGrants.textContent = userFinance.activeGrants;

    // Render aktywności
    elActivity.innerHTML = userFinance.activity
        .map(a => `<li>${a}</li>`)
        .join("");

    SystemLog.log("UserFinance", "info", "Dane User Finance Console zostały wyrenderowane");
}
