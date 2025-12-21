// ===============================================
// CityOfGATE — DIAGNOSTICS.JS
// Centralny system logowania i diagnostyki
// ===============================================

// Bufor logów (ostatnie 200 wpisów)
const diagnosticsBuffer = [];

// Maksymalna liczba logów w pamięci
const MAX_LOGS = 200;

// Główna funkcja logowania
function diagnosticsLog(message, type = "info") {
    const timestamp = new Date().toISOString();

    const entry = {
        timestamp,
        type,
        message
    };

    // Dodaj do bufora
    diagnosticsBuffer.push(entry);

    // Utrzymuj limit
    if (diagnosticsBuffer.length > MAX_LOGS) {
        diagnosticsBuffer.shift();
    }

    // Log do konsoli (czytelny format)
    console.log(
        `%c[Diagnostics][${type.toUpperCase()}] ${timestamp} → ${message}`,
        type === "error"
            ? "color: red; font-weight: bold;"
            : type === "warning"
            ? "color: orange;"
            : "color: #4CAF50;"
    );
}

// Zwraca wszystkie logi
function diagnosticsGetAll() {
    return [...diagnosticsBuffer];
}

// Czyści logi
function diagnosticsClear() {
    diagnosticsBuffer.length = 0;
    console.log("%c[Diagnostics] Logi zostały wyczyszczone", "color: gray;");
}

// Eksport (jeśli loader lub moduły importują)
export { diagnosticsLog, diagnosticsGetAll, diagnosticsClear };
