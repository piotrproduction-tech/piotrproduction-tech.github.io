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
            </div>
        </div>
    `;
}
