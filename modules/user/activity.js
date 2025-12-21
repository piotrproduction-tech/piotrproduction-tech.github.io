// ===============================================
// CityOfGATE — USER ACTIVITY (FE‑02)
// WERSJA 1.0
// ===============================================

export function initModule() {
    SystemLog.log("UserActivity", "info", "Moduł User Activity został uruchomiony");

    const elList = document.getElementById("uaList");

    if (!elList) {
        SystemLog.log("UserActivity", "error", "Brak elementu HTML #uaList");
        return;
    }

    // Mock historii aktywności użytkownika
    const activity = [
        { time: "2025-12-21 22:10", action: "Otworzył moduł User Settings" },
        { time: "2025-12-21 22:05", action: "Zaktualizował preferencje językowe" },
        { time: "2025-12-21 21:58", action: "Otworzył User Profile" },
        { time: "2025-12-21 21:45", action: "Otworzył Finance Dashboard" },
        { time: "2025-12-21 21:40", action: "Oznaczył fakturę INV-002 jako opłaconą" },
        { time: "2025-12-21 21:35", action: "Dodał płatność P-004" }
    ];

    // Render listy aktywności
    elList.innerHTML = activity
        .map(entry => `
            <div style="
                padding: 12px;
                margin-bottom: 10px;
                background: #f5f5f5;
                border-radius: 6px;
                border: 1px solid #ddd;
            ">
                <strong>${entry.time}</strong><br>
                ${entry.action}
            </div>
        `)
        .join("");

    SystemLog.log("UserActivity", "info", "Aktywność użytkownika została wyrenderowana");
}
