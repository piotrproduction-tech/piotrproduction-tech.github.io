// ===============================================
// CityOfGATE — DIAGNOSTICS PANEL (JS)
// WERSJA 1.0
// ===============================================

export function initModule() {
    console.log("Panel diagnostyczny został uruchomiony");

    const refreshBtn = document.getElementById("refreshLogsBtn");
    const clearBtn = document.getElementById("clearLogsBtn");
    const tableBody = document.querySelector("#diagnosticsTable tbody");

    // Funkcja renderująca logi w tabeli
    function renderLogs() {
        if (typeof diagnosticsGetAll !== "function") {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="3" style="color:red;">
                        Błąd: diagnostics.js nie jest załadowany lub funkcja diagnosticsGetAll() nie istnieje.
                    </td>
                </tr>
            `;
            return;
        }

        const logs = diagnosticsGetAll();

        if (logs.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="3" style="color:gray;">Brak logów diagnostycznych.</td>
                </tr>
            `;
            return;
        }

        tableBody.innerHTML = logs
            .map(log => {
                const color =
                    log.type === "error" ? "red" :
                    log.type === "warning" ? "orange" :
                    "green";

                return `
                    <tr>
                        <td>${log.timestamp}</td>
                        <td style="color:${color}; font-weight:bold;">${log.type.toUpperCase()}</td>
                        <td>${log.message}</td>
                    </tr>
                `;
            })
            .join("");
    }

    // Obsługa przycisków
    refreshBtn.addEventListener("click", () => {
        renderLogs();
    });

    clearBtn.addEventListener("click", () => {
        if (typeof diagnosticsClear === "function") {
            diagnosticsClear();
        }
        renderLogs();
    });

    // Pierwsze renderowanie
    renderLogs();
}
