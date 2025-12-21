// ===============================================
// CityOfGATE — BUDGET BANK (JS)
// WERSJA 1.0
// ===============================================

export function initModule() {
    console.log("Moduł Finance → Budget Bank został uruchomiony");

    const loadBtn = document.getElementById("loadDataBtn");
    const clearBtn = document.getElementById("clearViewBtn");
    const output = document.getElementById("budgetOutput");

    if (!loadBtn || !clearBtn || !output) {
        console.error("Brak elementów HTML modułu Budget Bank");
        return;
    }

    // ✅ Przycisk: Pobierz dane (na razie mock — backend dodamy później)
    loadBtn.addEventListener("click", () => {
        diagnosticsLog("BudgetBank: Pobieram dane (mock)", "info");

        // Symulacja danych (do czasu aż podłączymy Apps Script)
        const mockData = {
            saldo: 1250.55,
            ostatniaTransakcja: "2025-01-12",
            liczbaTransakcji: 14
        };

        output.innerHTML = `
            <h3>Dane finansowe</h3>
            <p><strong>Saldo:</strong> ${mockData.saldo} PLN</p>
            <p><strong>Ostatnia transakcja:</strong> ${mockData.ostatniaTransakcja}</p>
            <p><strong>Liczba transakcji:</strong> ${mockData.liczbaTransakcji}</p>
        `;

        diagnosticsLog("BudgetBank: Dane załadowane (mock)", "info");
    });

    // ✅ Przycisk: Wyczyść widok
    clearBtn.addEventListener("click", () => {
        output.innerHTML = `<em>Brak danych — kliknij „Pobierz dane”.</em>`;
        diagnosticsLog("BudgetBank: Widok wyczyszczony", "info");
    });
}
