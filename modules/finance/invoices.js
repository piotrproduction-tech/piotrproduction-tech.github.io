// ===============================================
// CityOfGATE — INVOICES (FE‑02)
// WERSJA 1.0
// ===============================================

export function initModule() {
    SystemLog.log("Invoices", "info", "Moduł Invoices został uruchomiony");

    const invoicesTable = document.getElementById("invoicesTable");
    const messageBox = document.getElementById("invoiceMessage");

    if (!invoicesTable) {
        SystemLog.log("Invoices", "error", "Brak elementów HTML modułu");
        return;
    }

    // Mock danych faktur
    const invoices = [
        { id: "INV-001", issuer: "Studio Filmowe XYZ", amount: 4200, status: "unpaid" },
        { id: "INV-002", issuer: "Dostawca Oświetlenia", amount: 1800, status: "paid" },
        { id: "INV-003", issuer: "Freelancer — montaż", amount: 900, status: "unpaid" }
    ];

    function renderInvoices() {
        invoicesTable.innerHTML = invoices.map(inv => `
            <tr>
                <td style="border-bottom: 1px solid #eee;">${inv.id}</td>
                <td style="border-bottom: 1px solid #eee;">${inv.issuer}</td>
                <td style="border-bottom: 1px solid #eee;">${inv.amount} PLN</td>
                <td style="border-bottom: 1px solid #eee;">${inv.status}</td>
                <td style="border-bottom: 1px solid #eee;">
                    <button onclick="window.__markInvoicePaid('${inv.id}')">Oznacz jako opłaconą</button>
                    <button onclick="window.__downloadInvoice('${inv.id}')">Pobierz PDF</button>
                </td>
            </tr>
        `).join("");
    }

    // Oznaczanie faktury jako opłaconej
    window.__markInvoicePaid = function(id) {
        const invoice = invoices.find(i => i.id === id);
        if (!invoice) {
            SystemLog.log("Invoices", "warn", `Próba oznaczenia nieistniejącej faktury: ${id}`);
            return;
        }

        invoice.status = "paid";
        renderInvoices();

        messageBox.style.color = "green";
        messageBox.textContent = `Faktura ${id} została oznaczona jako opłacona.`;

        SystemLog.log("Invoices", "info", `Faktura ${id} oznaczona jako paid`);
    };

    // Pobieranie PDF (mock)
    window.__downloadInvoice = function(id) {
        SystemLog.log("Invoices", "info", `Pobieranie PDF dla faktury ${id} (mock)`);

        messageBox.style.color = "blue";
        messageBox.textContent = `Symulacja pobierania PDF dla faktury ${id}.`;
    };

    renderInvoices();
}
