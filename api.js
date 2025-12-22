/**
 * ============================================================
 *  CityOfGATE — api.js
 *  Warstwa komunikacji FE → BE (Apps Script WebApp)
 *  Autor: Piotr + Copilot
 * ============================================================
 *
 * Funkcje:
 *  - callApi(endpoint, payload)
 *  - automatyczne POST JSON → JSON
 *  - obsługa błędów
 *  - integracja z loaderem 3.0
 *  - integracja z Profile Console 2.0
 *
 * Wymagania:
 *  - WebApp musi być opublikowany jako "Anyone"
 *  - BackendAPI.gs musi być aktywny
 *  - EndpointMap.gs musi zawierać endpoint
 */

/**
 * Ustaw tutaj URL swojego WebApp
 * (po publikacji: Deploy → New Deployment → WebApp)
 */
const API_URL = "const API_URL = "const API_URL = "https://script.google.com/macros/s/AKfycbxTDcP7HZruQfdiSdkk_UstwqHUcvNEalwctDTSgLhRoHp64h7QoIxXXBNvSL_dhtPo/exec";
";
";

/**
 * Główna funkcja wywołująca backend
 */
async function callApi(endpoint, payload = {}) {
  try {
    const body = {
      endpoint,
      payload
    };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify(body)
    });

    const json = await res.json();

    if (!json.ok) {
      console.warn("API error:", endpoint, json.error);
      return { ok: false, error: json.error };
    }

    return { ok: true, data: json.data };

  } catch (err) {
    console.error("API fatal error:", endpoint, err);
    return { ok: false, error: "Błąd połączenia z backendem" };
  }
}

/**
 * Helper: ładuje dane użytkownika (Profile Console 2.0)
 */
async function loadUserProfile(userId) {
  return await callApi("user/getProfile", { userId });
}

/**
 * Helper: zapisuje dane użytkownika
 */
async function updateUserProfile(userId, data) {
  return await callApi("user/updateProfile", { userId, ...data });
}

/**
 * Helper: pobiera logi systemowe
 */
async function loadSystemLogs() {
  return await callApi("system/getLogs", {});
}

/**
 * Helper: ping backendu
 */
async function pingBackend() {
  return await callApi("system/ping", {});
}

