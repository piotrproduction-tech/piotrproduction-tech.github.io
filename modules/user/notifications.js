// ===============================================
// CityOfGATE — USER NOTIFICATIONS (FE‑02)
// WERSJA 1.0
// ===============================================

export function initModule() {
    SystemLog.log("UserNotifications", "info", "Moduł User Notifications został uruchomiony");

    const elList = document.getElementById("unList");

    if (!elList) {
        SystemLog.log("UserNotifications", "error", "Brak elementu HTML #unList");
        return;
    }

    // Mock powiadomień użytkownika
    const notifications = [
        { type: "system", text: "Nowa wersja modułu Finance została wdrożona", time: "2025-12-21 22:30" },
        { type: "finance", text: "Faktura INV-002 została opłacona", time: "2025-12-21 22:15" },
        { type: "community", text: "Otrzymałeś nową wiadomość od zespołu Community", time: "2025-12-21 21:50" },
        { type: "system", text: "Twoje ustawienia zostały zapisane", time: "2025-12-21 21:40" }
    ];

    // Render listy powiadomień
    elList.innerHTML = notifications
        .map(n => `
            <div style="
                padding: 12px;
                margin-bottom: 10px;
                background: #f5f5f5;
                border-radius: 6px;
                border: 1px solid #ddd;
            ">
                <strong>[${n.type.toUpperCase()}]</strong> — ${n.text}<br>
                <span style="color:#666; font-size: 13px;">${n.time}</span>
            </div>
        `)
        .join("");

    SystemLog.log("UserNotifications", "info", "Powiadomienia użytkownika zostały wyrenderowane");
}
