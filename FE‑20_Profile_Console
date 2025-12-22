/**
 * ============================================================
 *  FE‑20 — Profile Console 2.0
 *  Dashboard użytkownika
 * ============================================================
 */

function FE_20_Profile_Console_start() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <div style="padding: 20px; font-family: Arial;">
            <h2>👤 Mój Kokpit</h2>
            <p>Ładowanie danych użytkownika...</p>
            <div id="pc20-profile"></div>
        </div>
    `;

    FE_20_loadProfile();
}

async function FE_20_loadProfile() {
    const userId = window.currentUserId;
    const res = await loadUserProfile(userId);

    const el = document.getElementById("pc20-profile");

    if (!res.ok) {
        el.innerHTML = "<p>Błąd ładowania profilu.</p>";
        return;
    }

    const u = res.data;

    el.innerHTML = `
        <p><strong>Imię:</strong> ${u.name}</p>
        <p><strong>Rola:</strong> ${u.role}</p>
        <p><strong>Reputacja:</strong> ${u.reputation}</p>
    `;
}
