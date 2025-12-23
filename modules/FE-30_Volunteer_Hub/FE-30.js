console.log("[FE-30] JS loaded");

export function init() {
    console.log("[FE-30] init()");

    const content = document.getElementById("module-content");
    if (!content) {
        console.error("[FE-30] Brak elementu #module-content");
        return;
    }

    content.innerHTML = `
        <p>Moduł FE-30 działa poprawnie.</p>
    `;
}
