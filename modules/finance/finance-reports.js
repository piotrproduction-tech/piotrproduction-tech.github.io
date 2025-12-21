// ===============================================
// CityOfGATE — FINANCE REPORTS (FE‑02)
// WERSJA 1.0
// ===============================================

export function initModule() {
    SystemLog.log("FinanceReports", "info", "Moduł Finance Reports został uruchomiony");

    const summaryBox = document.getElementById("summaryBox");
    const transactionsTable = document.getElementById("transactionsTable");

    if (!summaryBox || !transactionsTable) {
        SystemLog.log("FinanceReports", "error", "Brak elementów HTML modułu");
        return;
    }

    // Mock danych podsumowania
    const summary = {
        totalBudget: 125000,
        totalSpent: 48200,
        grantsApproved: 12,
        vaultValue: 78000
    };

    // Mock transakcji
    const transactions = [
        { date: "2025-12-01", desc: "Zakup sprzętu filmowego", amount: -3200 },
        { date: "2025-11-28", desc: "Wpływ grantu edukacyjnego", amount: 15000 },
        { date: "2025-11-20", desc: "Opłata za licencje", amount: -1200 },
        { date: "2025-11-15", desc: "Wpływ grantu technologicznego", amount: 20000 }
    ];

    // Render podsumowania
    summaryBox.innerHTML = `
        <strong>Całkowity budżet:</strong> ${summary.totalBudget} PLN<br>
        <strong>Wydatki:</strong> ${summary.totalSpent} PLN<br>
        <strong>Zatwierdzone granty:</strong> ${summary.grantsApproved}<br>
        <strong>Wartość zasobów (Vault):</strong> ${summary.vaultValue} PLN
    `;

    // Render transakcji
    transactionsTable.innerHTML = transactions.map(t => `
        <tr>
            <td style="border-bottom: 1px solid #eee;">${t.date}</td>
            <td style="border-bottom: 1px solid #eee;">${t.desc}</td>
            <td style="border-bottom: 1px solid #eee; color: ${t.amount < 0 ? 'red' : 'green'};">
                ${t.amount} PLN
            </td>
        </tr>
    `).join("");

    SystemLog.log("FinanceReports", "info", "Dane raportów zostały wyrenderowane");
}
