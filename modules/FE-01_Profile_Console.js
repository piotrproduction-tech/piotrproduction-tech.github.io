console.log("FE‑20_Profile_Console.js załadowany poprawnie");

// Po załadowaniu HTML modułu
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("profile-load-btn");
    if (!btn) {
        console.error("Brak przycisku #profile-load-btn — HTML modułu nie został jeszcze wstawiony.");
        return;
    }

    btn.addEventListener("click", async () => {
        const userId = document.getElementById("profile-user-id").value.trim();
        const output = document.getElementById("profile-output");

        if (!userId) {
            output.innerHTML = "<p>Podaj ID użytkownika.</p>";
            return;
        }

        output.innerHTML = "<p>Ładowanie…</p>";

        // Wywołanie API
        const response = await callApi("getUserProfile", { userId });

        if (!response.ok) {
            output.innerHTML = `<p>Błąd: ${response.error}</p>`;
            return;
        }

        // Wyświetlenie danych
        output.innerHTML = `
            <h3>Profil użytkownika</h3>
            <p><strong>ID:</strong> ${response.data.id}</p>
            <p><strong>Imię:</strong> ${response.data.name}</p>
            <p><strong>Email:</strong> ${response.data.email}</p>
        `;
    });
});
