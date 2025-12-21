// ===============================================
// CityOfGATE — LOADER.JS
// Dynamiczne ładowanie modułów HTML + JS
// ===============================================

// Główny kontener, do którego wstrzykujemy moduły
const APP_CONTAINER_ID = "app";

// Funkcja logująca diagnostykę
function logDiagnostics(message, type = "info") {
    console.log(`[Diagnostics][${type.toUpperCase()}] ${message}`);

    // Jeśli masz diagnostics.js z funkcją diagnosticsLog(),
    // możesz tu dodać integrację:
    if (typeof diagnosticsLog === "function") {
        diagnosticsLog(message, type);
    }
}

// Główna funkcja ładowania modułu
async function loadModule(path) {
    logDiagnostics(`Rozpoczynam ładowanie modułu: ${path}`);

    const htmlPath = `modules/${path}.html`;
    const jsPath = `modules/${path}.js`;

    try {
        // 1. Pobierz HTML modułu
        logDiagnostics(`Pobieram HTML: ${htmlPath}`);
        const htmlResponse = await fetch(htmlPath);

        if (!htmlResponse.ok) {
            throw new Error(`Nie znaleziono pliku HTML: ${htmlPath}`);
        }

        const htmlContent = await htmlResponse.text();

        // 2. Wstaw HTML do kontenera
        const app = document.getElementById(APP_CONTAINER_ID);
        if (!app) {
            throw new Error(`Nie znaleziono kontenera #${APP_CONTAINER_ID}`);
        }

        app.innerHTML = htmlContent;
        logDiagnostics(`HTML modułu ${path} został załadowany`);

        // 3. Pobierz i uruchom JS modułu
        logDiagnostics(`Pobieram JS: ${jsPath}`);
        const module = await import(`./${jsPath}`);

        if (module && typeof module.initModule === "function") {
            logDiagnostics(`Uruchamiam initModule() dla ${path}`);
            module.initModule();
        } else {
            logDiagnostics(`Brak funkcji initModule() w ${jsPath}`, "warning");
        }

        logDiagnostics(`Moduł ${path} został w pełni załadowany`);

    } catch (error) {
        logDiagnostics(`Błąd ładowania modułu ${path}: ${error.message}`, "error");

        const app = document.getElementById(APP_CONTAINER_ID);
        if (app) {
            app.innerHTML = `
                <div style="padding:20px; color:red;">
                    <h2>Błąd ładowania modułu</h2>
                    <p>${error.message}</p>
                </div>
            `;
        }
    }
}

// ===============================================
// Eksport funkcji (jeśli loader.js jest importowany)
// ===============================================
export { loadModule };
