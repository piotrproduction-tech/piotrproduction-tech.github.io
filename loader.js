/* ============================================================
   SYSTEM MODUŁÓW CITYOFGATE — LOADER 2.0
   ============================================================ */

async function loadModule(moduleFolder) {
    console.log(`[${moduleFolder}] Loading module…`);

    const container = document.getElementById("module-container");
    if (!container) {
        console.error("Brak elementu #module-container");
        return;
    }

    const basePath = `modules/${moduleFolder}`;

    /* ------------------------------
       1. Pobierz manifest
    ------------------------------ */
    let manifest;
    try {
        const manifestResponse = await fetch(`${basePath}/manifest.json?v=${Date.now()}`);
        manifest = await manifestResponse.json();
        console.log(`[${manifest.id}] Manifest loaded`);
    } catch (err) {
        console.error(`[${moduleFolder}] Błąd ładowania manifest.json`, err);
        return;
    }

    /* ------------------------------
       2. Wczytaj HTML modułu
    ------------------------------ */
    try {
        const htmlResponse = await fetch(`${basePath}/${manifest.id}.html?v=${Date.now()}`);
        const html = await htmlResponse.text();
        container.innerHTML = html;
        console.log(`[${manifest.id}] HTML loaded`);
    } catch (err) {
        console.error(`[${manifest.id}] Błąd ładowania HTML`, err);
        return;
    }

    /* ------------------------------
       3. Wczytaj CSS modułu (opcjonalnie)
    ------------------------------ */
    try {
        const cssUrl = `${basePath}/${manifest.id}.css?v=${Date.now()}`;
        const cssCheck = await fetch(cssUrl);

        if (cssCheck.ok) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = cssUrl;
            document.head.appendChild(link);
            console.log(`[${manifest.id}] CSS loaded`);
        } else {
            console.log(`[${manifest.id}] CSS not found (optional)`);
        }
    } catch (err) {
        console.warn(`[${manifest.id}] CSS load skipped`, err);
    }

    /* ------------------------------
       4. Wczytaj JS modułu jako ES module
    ------------------------------ */
    try {
        const moduleJs = await import(`./${basePath}/${manifest.id}.js?v=${Date.now()}`);
        console.log(`[${manifest.id}] JS loaded`);

        if (moduleJs.init) {
            moduleJs.init();
            console.log(`[${manifest.id}] Ready`);
        } else {
            console.warn(`[${manifest.id}] Brak funkcji init()`);
        }
    } catch (err) {
        console.error(`[${manifest.id}] Błąd ładowania JS`, err);
    }
}
