console.log("[FE‑20] JS loaded");

export function init() {
    console.log("[FE‑20] init()");

    const btn = document.getElementById("profile-load-btn");
    const output = document.getElementById("profile-output");

    if (!btn) {
        console.error("[FE‑20] Brak przycisku #profile-load-btn");
        return;
    }

    btn.addEventListener("click", async () => {
        const userId = document.getElementById("profile-user-id").value.trim();

        if (!userId) {
            output.innerHTML = "<p>Podaj ID użytkownika.</p>";
            return;
        }

        output.innerHTML = "<p>Ładowanie…</p>";

        const response = await callApi("getUserProfile", { userId });

        if (!response.ok) {
            output.innerHTML = `<p>Błąd: ${response.error}</p>`;
            return;
        }

        output.innerHTML = `
            <h3>Profil użytkownika</h3>
            <p><strong>ID:</strong> ${response.data.id}</p>
            <p><strong>Imię:</strong> ${response.data.name}</p>
            <p><strong>Email:</strong> ${response.data.email}</p>
        `;
    });
}
