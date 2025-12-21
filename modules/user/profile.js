// ===============================================
// CityOfGATE — USER PROFILE (FE‑02)
// WERSJA 1.0
// ===============================================

export function initModule() {
    SystemLog.log("UserProfile", "info", "Moduł User Profile został uruchomiony");

    const elName = document.getElementById("upName");
    const elRole = document.getElementById("upRole");
    const elReputation = document.getElementById("upReputation");
    const elEmail = document.getElementById("upEmail");
    const elLanguage = document.getElementById("upLanguage");
    const elNotifications = document.getElementById("upNotifications");

    if (!elName || !elRole || !elReputation || !elEmail || !elLanguage || !elNotifications) {
        SystemLog.log("UserProfile", "error", "Brak elementów HTML modułu");
        return;
    }

    // Mock danych użytkownika
    const user = {
        name: "Piotr",
        role: "Architect",
        reputation: 87,
        email: "piotr@example.com",
        language: "Polski",
        notifications: "Włączone"
    };

    // Render danych
    elName.textContent = user.name;
    elRole.textContent = user.role;
    elReputation.textContent = user.reputation;
    elEmail.textContent = user.email;
    elLanguage.textContent = user.language;
    elNotifications.textContent = user.notifications;

    SystemLog.log("UserProfile", "info", "Dane profilu użytkownika zostały wyrenderowane");
}
