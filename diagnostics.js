/**
 * ============================================================
 *  CityOfGATE — FRONTEND DIAGNOSTICS
 *  Kompletny test połączenia FE ↔ BE
 * ============================================================
 */

async function runDiagnostics() {
    console.log("==============================================");
    console.log("🔍 CityOfGATE — DIAGNOSTYKA FRONTENDU");
    console.log("==============================================");

    // 1. Test: Czy API_BASE jest ustawione?
    console.log("\n[1] Test: API_BASE");
    if (!API_BASE) {
        console.warn("⚠️ API_BASE nie jest ustawione — próbuję pobrać...");
        await loadBackendURL();
    }

    if (API_BASE) {
        console.log("✅ API_BASE OK:", API_BASE);
    } else {
        console.error("❌ API_BASE nie zostało ustawione — przerwano diagnostykę.");
        return;
    }

    // 2. Test: Czy backend odpowiada?
    console.log("\n[2] Test: Połączenie z backendem");
    try {
        const ping = await apiGET("system/webapp-url");
        console.log("✅ Backend odpowiada:", ping);
    } catch (err) {
        console.error("❌ Backend nie odpowiada:", err);
        return;
    }

    // 3. Test: Czy router działa?
    console.log("\n[3] Test: Router");
    try {
        const testRouter = await apiGET("unknown-test-endpoint");
        console.warn("⚠️ Router NIE zwrócił błędu:", testRouter);
    } catch (err) {
        console.log("✅ Router poprawnie zwraca błędy:", err);
    }

    // 4. Test: Endpoint FINANCE/BANK
    console.log("\n[4] Test: finance/bank");
    const bank = await apiGET("finance/bank");

    if (bank.error) {
        console.error("❌ finance/bank zwrócił błąd:", bank.error);
    } else {
        console.log("✅ finance/bank OK:", bank);
    }

    // 5. Test: BudgetBank — minimalny test funkcjonalny
    console.log("\n[5] Test: BudgetBank — minimalny test");
    if (bank.balance !== undefined && Array.isArray(bank.transactions)) {
        console.log("✅ BudgetBank działa poprawnie");
    } else {
        console.error("❌ BudgetBank NIE działa — brak danych");
    }

    console.log("\n==============================================");
    console.log("✅ DIAGNOSTYKA ZAKOŃCZONA");
    console.log("==============================================");
}

