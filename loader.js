/**
 * ============================================================
 *  CityOfGATE — Loader 3.0
 *  Centralny silnik ładowania modułów FE‑XX
 *  Autor: Piotr + Copilot
 * ============================================================
 *
 * Funkcje:
 *  - loadModule(name)
 *  - loadUser()
 *  - showLoader() / hideLoader()
 *  - dynamiczne wczytywanie FE‑XX
 *
 * Wymagania:
 *  - api.js musi być załadowany
 *  - FE‑Common musi być dostępny
 *  - każdy moduł FE‑XX musi mieć funkcję startową:
 *        FE_XX_start()
 */

/* ============================================================
   GLOBALNE ZMIENNE
   ============================================================ */

window.currentUserId = null;   // ustawiane po zalogowaniu / pobraniu profilu
window.currentModule = null;   // aktualnie załadowany moduł

/* ============================================================
   LOADER UI
   ============================================================ */

function showLoader(text = "Ładowanie...") {
  const loader = document.getElementById("global-loader");
  if (loader) {
    loader.style.display = "flex";
    loader.querySelector(".loader-text").innerText = text;
  }
}

function hideLoader() {
  const loader = document.getElementById("global-loader");
  if (loader) loader.style.display = "none";
}

/* ============================================================
   ŁADOWANIE UŻYTKOWNIKA (Profile Console 2.0)
   ============================================================ */

async function loadUser() {
  showLoader("Ładowanie profilu...");

  // Tymczasowo — w przyszłości pobierzesz userId z logowania
  const userId = "USER_001";
  window.currentUserId = userId;

  const res = await loadUserProfile(userId);

  if (!res.ok) {
    alert("Błąd ładowania profilu: " + res.error);
    hideLoader();
    return;
  }

  window.currentUser = res.data;
  hideLoader();
}

/* ============================================================
   GŁÓWNA FUNKCJA ŁADOWANIA MODUŁÓW
   ============================================================ */

async function loadModule(moduleName) {
  try {
    showLoader("Ładowanie modułu...");

    // 1. Wczytaj plik FE‑XX dynamicznie
    await loadScript(moduleName + ".js");

    // 2. Znajdź funkcję startową
    const startFnName = moduleName.replace("-", "_") + "_start";
    const startFn = window[startFnName];

    if (!startFn) {
      hideLoader();
      alert("Moduł nie ma funkcji startowej: " + startFnName);
      return;
    }

    // 3. Uruchom moduł
    startFn();

    window.currentModule = moduleName;
    hideLoader();

  } catch (err) {
    hideLoader();
    alert("Błąd ładowania modułu: " + err);
  }
}

/* ============================================================
   DYNAMICZNE WCZYTYWANIE SKRYPTÓW
   ============================================================ */

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${url}"]`);

    // Jeśli już załadowany — nie ładuj ponownie
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = url;
    script.onload = () => resolve();
    script.onerror = () => reject("Nie można załadować: " + url);

    document.body.appendChild(script);
  });
}

/* ============================================================
   AUTO-INIT (np. na city-map.html)
   ============================================================ */

window.addEventListener("DOMContentLoaded", async () => {
  await loadUser();
});
