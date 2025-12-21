/**
 * Dynamiczne ładowanie modułów HTML + JS
 */
function loadModule(htmlPath, jsPath) {
  const container = document.getElementById("module-container");

  // Wczytaj HTML modułu
  fetch(htmlPath)
    .then(res => {
      if (!res.ok) throw new Error("Nie można wczytać modułu HTML: " + htmlPath);
      return res.text();
    })
    .then(html => {
      container.innerHTML = html;

      // Wczytaj JS modułu
      const script = document.createElement("script");
      script.src = jsPath + "?v=" + Date.now(); // anty-cache
      script.onload = () => console.log("[Loader] JS modułu załadowany:", jsPath);
      script.onerror = () => console.error("[Loader] Błąd ładowania JS:", jsPath);
      document.body.appendChild(script);
    })
    .catch(err => {
      container.innerHTML = "<p style='color:red;'>Błąd ładowania modułu: " + err + "</p>";
      console.error("[Loader] ERROR:", err);
    });
}
