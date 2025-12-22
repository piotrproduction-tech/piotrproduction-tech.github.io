/* ============================================================
   DYNAMICZNE WCZYTYWANIE SKRYPTÓW (ANTI‑CACHE)
   ============================================================ */

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-module="${url}"]`);
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.src = `${url}?v=${Date.now()}`;
    script.dataset.module = url;

    script.onload = () => resolve();
    script.onerror = () => reject(`Błąd ładowania skryptu: ${url}`);

    document.body.appendChild(script);
  });
}

/* ============================================================
   ŁADOWANIE MODUŁÓW
   ============================================================ */

function loadModule(moduleId) {
  console.log("Ładuję moduł:", moduleId);

  const container = document.getElementById("module-container");
  if (!container) {
    console.error("Brak elementu #module-container");
    return;
  }

  // Wczytaj HTML modułu
  fetch(`modules/${moduleId}.html?v=${Date.now()}`)
    .then(response => response.text())
    .then(html => {
      container.innerHTML = html;

      // Wczytaj JS modułu
      return loadScript(`modules/${moduleId}.js`);
    })
    .catch(err => {
      console.error("Błąd ładowania modułu:", err);
    });
}
