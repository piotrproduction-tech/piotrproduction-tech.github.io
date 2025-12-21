// ===============================================
// CityOfGATE — LOGS ENGINE PANEL (JS)
// WERSJA 1.0
// ===============================================


export function initModule() {
    console.log("Moduł System → Logs Engine został uruchomiony");


    const moduleInput = document.getElementById("logsFilterModule");
    const levelSelect = document.getElementById("logsFilterLevel");
    const refreshBtn = document.getElementById("logsRefreshBtn");
    const clearBtn = document.getElementById("logsClearBtn");
    const tableBody = document.getElementById("logsTableBody");


    if (!moduleInput || !levelSelect || !refreshBtn || !clearBtn || !tableBody) {
        console.error("Logs Engine: brak elementów HTML panelu logów");
        return;
    }


    function renderTable() {
        if (!window.SystemLog) {
            tableBody.innerHTML = `
                <tr><td colspan="5"><strong>Błąd:</strong> SystemLog nie jest dostępny.</td></tr>
            `;
            return;
        }


        const allLogs = SystemLog.getAll();
        const moduleFilter = (moduleInput.value || "").trim().toLowerCase();
        const levelFilter = (levelSelect.value || "").trim().toLowerCase();


        const filtered = allLogs.filter(entry => {
            let ok = true;
            if (moduleFilter) {
                ok = ok && String(entry.module || "").toLowerCase().includes(moduleFilter);
            }
            if (levelFilter) {
                ok = ok && String(entry.level || "").toLowerCase() === levelFilter;
            }
            return ok;
        });


        if (filtered.length === 0) {
            tableBody.innerHTML = `
                <tr><td colspan="5"><em>Brak logów dla wybranych filtrów.</em></td></tr>
            `;
            return;
        }


        const rowsHtml = filtered.map(entry => {
            let color = "#000";
            if (entry.level === "error") color = "#cc0000";
            else if (entry.level === "warn") color = "#cc8800";


            return `
                <tr>
                    <td style="border-bottom: 1px solid #eee;">${entry.id}</td>
                    <td style="border-bottom: 1px solid #eee;">${entry.time}</td>
                    <td style="border-bottom: 1px solid #eee;">${entry.module}</td>
                    <td style="border-bottom: 1px solid #eee; color: ${color};">${entry.level}</td>
                    <td style="border-bottom: 1px solid #eee;">${entry.message}</td>
                </tr>
            `;
        }).join("");


        tableBody.innerHTML = rowsHtml;
    }


    refreshBtn.addEventListener("click", () => {
        renderTable();
        diagnosticsLog("LogsEngine: Odświeżono widok logów", "info");
    });


    clearBtn.addEventListener("click", () => {
        if (window.SystemLog) {
            SystemLog.clear();
            renderTable();
            diagnosticsLog("LogsEngine: Wyczyszczono logi w pamięci", "warn");
        }
    });


    // Pierwsze renderowanie po wejściu
    renderTable();
}
