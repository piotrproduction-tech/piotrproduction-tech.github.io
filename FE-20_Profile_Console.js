/**
 * ============================================================
 *  FE‑20 — Profile Console 2.0 (JS version)
 * ============================================================
 */

function FE_20_Profile_Console_start() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <div style="padding: 30px; font-family: Arial, sans-serif;">

            <h1 style="text-align:center; margin-bottom: 20px;">
                👤 Mój Kokpit — Profile Console 2.0
            </h1>

            <p style="text-align:center; font-size: 18px; margin-bottom: 40px;">
                Twoje centrum dowodzenia w City of GATE.
            </p>

            <!-- ==========================
                 SZYBKIE TELEPORTY
                 ========================== -->
            <h2>⚡ Szybkie Teleporty</h2>

            <div style="
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 15px;
                margin-bottom: 40px;
            ">
                <div class="widget-tile" onclick="loadModule('FE-22_Stream_Square')">
                    🎤 Stream Square<br><small>Wydarzenia live</small>
                </div>

                <div class="widget-tile" onclick="loadModule('FE-23_Culture_Gallery')">
                    🖼️ Culture Gallery<br><small>Wystawy i sztuka</small>
                </div>

                <div class="widget-tile" onclick="loadModule('FE-21_Marketplace')">
                    🛒 Marketplace<br><small>Zakupy i licencje</small>
                </div>

                <div class="widget-tile" onclick="loadModule('FE-05_Education_And_DAO')">
                    📚 Education Library<br><small>Kursy i webinary</small>
                </div>

                <div class="widget-tile" onclick="loadModule('FE-31_Community_House')">
                    🏡 Community House<br><small>Grupy i fora</small>
                </div>

                <div class="widget-tile" onclick="loadModule('FE-30_DAO_Town_Hall')">
                    🏛️ DAO Town Hall<br><small>Głosowania i decyzje</small>
                </div>
            </div>

            <!-- ==========================
                 WIDŻETY
                 ========================== -->
            <h2>📦 Moje Widżety</h2>

            <div style="
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
            ">
                <div class="widget-box">
                    <h3>🎫 Moje Bilety</h3>
                    <p>Twoje nadchodzące wydarzenia.</p>
                    <button onclick="loadModule('FE-22_Stream_Square')">Zobacz wydarzenia</button>
                </div>

                <div class="widget-box">
                    <h3>🛍️ Moje Zakupy</h3>
                    <p>Filmy, muzyka, książki, sztuka.</p>
                    <button onclick="loadModule('FE-21_Marketplace')">Przejdź do Marketplace</button>
                </div>

                <div class="widget-box">
                    <h3>📚 Moje Kursy</h3>
                    <p>Twoje aktywne ścieżki edukacyjne.</p>
                    <button onclick="loadModule('FE-05_Education_And_DAO')">Otwórz bibliotekę</button>
                </div>

                <div class="widget-box">
                    <h3>⭐ Reputacja</h3>
                    <p>Twój wpływ w mieście.</p>
                    <button onclick="loadModule('FE-36_Citizen_Console')">Zobacz szczegóły</button>
                </div>

                <div class="widget-box">
                    <h3>🔷 Tokeny</h3>
                    <p>Twoje nagrody za aktywność.</p>
                    <button onclick="loadModule('FE-36_Citizen_Console')">Zobacz tokeny</button>
                </div>

                <div class="widget-box">
                    <h3>🔔 Powiadomienia</h3>
                    <p>Nowe wiadomości i alerty.</p>
                    <button onclick="loadModule('FE-20_Profile_Console')">Otwórz powiadomienia</button>
                </div>
            </div>

        </div>
    `;
}
