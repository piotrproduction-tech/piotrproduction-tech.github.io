// ===============================================
// CityOfGATE — PAYMENTS (FE‑02)
// WERSJA 1.0
// ===============================================

export function initModule() {
    SystemLog.log("Payments", "info", "Moduł Payments został uruchomiony");

    const paymentsTable = document.getElementById("paymentsTable");
    const receiverInput = document.getElementById("paymentReceiver");
    const amountInput = document.getElementById("paymentAmount");
    const addBtn = document.getElementById("paymentAddBtn");
    const messageBox = document.getElementById("paymentMessage");

    if (!paymentsTable || !receiverInput || !amountInput || !addBtn) {
        SystemLog.log("Payments", "error", "Brak elementów HTML modułu");
        return;
    }

    // Mock danych płatności
    const payments = [
        { id: "P-001", receiver: "Studio Filmowe XYZ", amount: 3200, status: "completed" },
        { id: "P-002", receiver: "Dostawca Oświetlenia", amount: 1800, status: "pending" },
        { id: "P-003", receiver: "Freelancer — montaż", amount: 900, status: "completed" }
    ];

    function renderPayments() {
        paymentsTable.innerHTML = payments.map(p => `
            <tr>
                <td style="border-bottom: 1px solid #eee;">${p.id}</td>
                <td style="border-bottom: 1px solid #eee;">${p.receiver}</td>
                <td style="border-bottom: 1px solid #eee;">${p.amount} PLN</td>
                <td style="border-bottom: 1px solid #eee;">${p.status}</td>
                <td style="border-bottom: 1px solid #eee;">
                    <button onclick="window.__markPayment('${p.id}')">Oznacz jako zapłacone</button>
                </td>
            </tr>
        `).join("");
    }

    // Globalna funkcja do oznaczania płatności
    window.__markPayment = function(id) {
        const payment = payments.find(p => p.id === id);
        if (!payment) {
            SystemLog.log("Payments", "warn", `Próba oznaczenia nieistniejącej płatności: ${id}`);
            return;
        }

        payment.status = "completed";
        renderPayments();

        messageBox.style.color = "green";
        messageBox.textContent = `Płatność ${id} została oznaczona jako zapłacona.`;

        SystemLog.log("Payments", "info", `Płatność ${id} oznaczona jako completed`);
    };

    // Dodawanie nowej płatności
    addBtn.addEventListener("click", () => {
        const receiver = receiverInput.value.trim();
        const amount = parseFloat(amountInput.value);

        if (!receiver || isNaN(amount)) {
            messageBox.style.color = "red";
            messageBox.textContent = "Podaj poprawne dane płatności.";
            return;
        }

        const newId = "P-" + String(payments.length + 1).padStart(3, "0");

        payments.push({
            id: newId,
            receiver,
            amount,
            status: "pending"
        });

        renderPayments();

        messageBox.style.color = "green";
        messageBox.textContent = `Dodano płatność ${newId}.`;

        SystemLog.log("Payments", "info", `Dodano nową płatność: ${newId}`);
    });

    renderPayments();
}
