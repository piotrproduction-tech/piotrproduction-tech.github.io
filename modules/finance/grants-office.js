// ===============================================
// CityOfGATE — GRANTS OFFICE (FE‑02)
// WERSJA 1.0
// ===============================================

export function initModule() {
    SystemLog.log("GrantsOffice", "info", "Moduł Grants Office został uruchomiony");

    const grantsTable = document.getElementById("grantsTable");
    const idInput = document.getElementById("grantIdInput");
    const statusSelect = document.getElementById("grantStatusSelect");
    const updateBtn = document.getElementById("grantUpdateBtn");
    const messageBox = document.getElementById("grantMessage");

    if (!grantsTable || !idInput || !statusSelect || !updateBtn) {
        SystemLog.log("GrantsOffice", "error", "Brak elementów HTML modułu");
        return;
    }

    // Mock danych grantów
    const grants = [
        { id: "G-001", name: "Grant Filmowy", status: "pending" },
        { id: "G-002", name: "Grant Edukacyjny", status: "approved" },
        { id: "G-003", name: "Grant Technologiczny", status: "rejected" }
    ];

    function renderGrants() {
        grantsTable.innerHTML = grants.map(g => `
            <tr>
                <td style="border-bottom: 1px solid #eee;">${g.id}</td>
                <td style="border-bottom: 1px solid #eee;">${g.name}</td>
                <td style="border-bottom: 1px solid #eee;">${g.status}</td>
                <td style="border-bottom: 1px solid #eee;">
                    <button onclick="window.__editGrant('${g.id}')">Edytuj</button>
                </td>
            </tr>
        `).join("");
    }

    // Funkcja globalna do edycji
    window.__editGrant = function(id) {
        idInput.value = id;
        SystemLog.log("GrantsOffice", "info", `Wybrano grant: ${id}`);
    };

    // Zmiana statusu
    updateBtn.addEventListener("click", () => {
        const id = idInput.value.trim();
        const status = statusSelect.value;

        if (!id) {
            messageBox.style.color = "red";
            messageBox.textContent = "Podaj ID grantu.";
            return;
        }

        const grant = grants.find(g => g.id.toLowerCase() === id.toLowerCase());
        if (!grant) {
            messageBox.style.color = "red";
            messageBox.textContent = "Nie znaleziono grantu.";
            SystemLog.log("GrantsOffice", "warn", `Próba zmiany statusu nieistniejącego grantu: ${id}`);
            return;
        }

        grant.status = status;
        renderGrants();

        messageBox.style.color = "green";
        messageBox.textContent = `Zmieniono status grantu ${id} na ${status}.`;

        SystemLog.log("GrantsOffice", "info", `Zmieniono status grantu ${id} na ${status}`);
    });

    renderGrants();
}
