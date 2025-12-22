<!-- ==========================================================
     PROFILE CONSOLE 2.0 — KOKPIT UŻYTKOWNIKA
     Widżety + Teleportacja + Szybkie skróty
     ========================================================== -->

<div style="padding: 30px; font-family: Arial, sans-serif;">

    <h1 style="text-align:center; margin-bottom: 20px;">
        👤 Mój Kokpit — Profile Console 2.0
    </h1>

    <p style="text-align:center; font-size: 18px; margin-bottom: 40px;">
        Twoje centrum dowodzenia w City of GATE.
    </p>

    <!-- ==========================
         SEKCJA: SZYBKIE TELEPORTY
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
         SEKCJA: WIDŻETY
         ========================== -->
    <h2>📦 Moje Widżety</h2>

    <div style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
    ">

        <!-- WIDŻET: Bilety -->
        <div class="widget-box">
            <h3>🎫 Moje Bilety</h3>
            <p>Twoje nadchodzące wydarzenia.</p>
            <button onclick="loadModule('FE-22_Stream_Square')">Zobacz wydarzenia</button>
        </div>

        <!-- WIDŻET: Zakupy -->
        <div class="widget-box">
            <h3>🛍️ Moje Zakupy</h3>
            <p>Filmy, muzyka, książki, sztuka.</p>
            <button onclick="loadModule('FE-21_Marketplace')">Przejdź do Marketplace</button>
        </div>

        <!-- WIDŻET: Kursy -->
        <div class="widget-box">
            <h3>📚 Moje Kursy</h3>
            <p>Twoje aktywne ścieżki edukacyjne.</p>
            <button onclick="loadModule('FE-05_Education_And_DAO')">Otwórz bibliotekę</button>
        </div>

        <!-- WIDŻET: Reputacja -->
        <div class="widget-box">
            <h3>⭐ Reputacja</h3>
            <p>Twój wpływ w mieście.</p>
            <button onclick="loadModule('FE-36_Citizen_Console')">Zobacz szczegóły</button>
        </div>

        <!-- WIDŻET: Tokeny -->
        <div class="widget-box">
            <h3>🔷 Tokeny</h3>
            <p>Twoje nagrody za aktywność.</p>
            <button onclick="loadModule('FE-36_Citizen_Console')">Zobacz tokeny</button>
        </div>

        <!-- WIDŻET: Powiadomienia -->
        <div class="widget-box">
            <h3>🔔 Powiadomienia</h3>
            <p>Nowe wiadomości i alerty.</p>
            <button onclick="loadModule('FE-20_Profile_Console')">Otwórz powiadomienia</button>
        </div>

    </div>

</div>

<style>
    .widget-tile {
        background: #f0f0f0;
        padding: 18px;
        border-radius: 10px;
        text-align: center;
        cursor: pointer;
        border: 1px solid #ddd;
        transition: 0.2s;
        font-size: 18px;
    }
    .widget-tile:hover {
        background: #e6e6e6;
        transform: translateY(-3px);
    }

    .widget-box {
        background: #ffffff;
        border-radius: 10px;
        padding: 20px;
        border: 1px solid #ddd;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .widget-box h3 {
        margin-top: 0;
    }
    .widget-box button {
        margin-top: 10px;
        padding: 10px 16px;
        border: none;
        background: #333;
        color: white;
        border-radius: 6px;
        cursor: pointer;
    }
    .widget-box button:hover {
        background: #555;
    }
</style>
