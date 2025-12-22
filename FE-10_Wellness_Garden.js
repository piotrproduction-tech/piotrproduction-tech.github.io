/**
 * ============================================================
 *  FE‑10 — Wellness Garden (v1)
 *  Podstawowy moduł ogrodu dobrostanu
 * ============================================================
 */

function FE_10_Wellness_Garden_start() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <div style="padding: 20px; font-family: Arial;">
            <h2>🌿 Wellness Garden</h2>
            <p>Witamy w Ogrodzie Dobrostanu.</p>
            <p>To jest podstawowa wersja modułu FE‑10.</p>

            <div id="wg10-content" style="margin-top: 20px;">
                <p>Ładowanie statystyk...</p>
            </div>
        </div>
    `;

    FE_10_loadStats();
}

async function FE_10_loadStats() {
    const userId = window.currentUserId;

    const res = await callApi("wellness/getUserStats", { userId });

    const el = document.getElementById("wg10-content");

    if (!res.ok) {
        el.innerHTML = "<p>Błąd ładowania statystyk.</p>";
        return;
    }

    const stats = res.data;

    el.innerHTML = `
        <p><strong>Punkty dobrostanu:</strong> ${stats.points}</p>
        <p><strong>Poziom:</strong> ${stats.level}</p>
    `;
}
