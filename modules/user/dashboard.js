// ===============================================
// CityOfGATE — USER DASHBOARD 2.0 (FE‑02)
// WERSJA 1.0
// ===============================================

export function initModule() {
    SystemLog.log("UserDashboard", "info", "User Dashboard 2.0 został uruchomiony");

    const elNameRole = document.getElementById("udNameRole");
    const elReputation = document.getElementById("udReputation");
    const elLastActivity = document.getElementById("udLastActivity");
    const elNotifications = document.getElementById("udNotifications");
    const elActivity = document.getElementById("udActivity");

    if (!elNameRole || !elReputation || !elLastActivity || !elNotifications || !elActivity) {
        SystemLog.log("UserDashboard", "error", "Brak elementów HTML modułu");
        return;
    }

    // Mock danych użytkownika
    const user = {
        name: "Piotr",
        role: "Architect",
        reputation: 87,
        lastActivity: "Otworzył Finance Dashboard",
        notifications: 3,
        activity: [
            "Zaktualizował ustawienia konta",
            "Otworzył moduł Analytics",
            "Oznaczył fakturę INV-002 jako opłaconą",
            "Dodał płatność P-004"
        ]
    };

    // Render
    elNameRole.textContent = `${user.name} — ${user.role}`;
    elReputation.textContent = user.reputation;
    elLastActivity.textContent = user.lastActivity;
    elNotifications.textContent = user.notifications;

    elActivity.innerHTML = user.activity
        .map(a => `<li>${a}</li>`)
        .join("");

    SystemLog.log("UserDashboard", "info", "User Dashboard 2.0 wyrenderowany");
}
