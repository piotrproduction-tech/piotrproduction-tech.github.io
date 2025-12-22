/**
 * ============================================================
 *  CityOfGATE — Loader 3.1 (Anti‑Cache Edition)
 *  Centralny silnik ładowania modułów FE‑XX
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

window.currentUserId = null;
window.currentModule = null;

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
   ŁADOWANIE UŻYTKOWNIKA
   ============================================================ */

async function loadUser() {
  showLoader("Ładowanie profilu...");

  const userId = "USER_001";
  window.currentUserId = userId;

  const res = await callApi("user/getProfile", { userId });

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

    // 1. Wczytaj plik FE‑XX dynamicznie (z anty‑cache)
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
   DYNAMICZNE WCZYTYWANIE SKRYPTÓW (ANTI‑CACHE)
   ============================================================ */

function loadScript(url) {
  return new Promise((resolve, reject) => {
    // Usuwamy poprzednią wersję skryptu, jeśli istnieje
    const existing = document.querySelector(`script[data-module="${url}"]`);
    if (existing) existing.remove();

    const script = document.createElement("script");

    // ANTY‑CACHE: zawsze pobieraj świeżą wersję
