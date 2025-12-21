/**
 * ============================================================
 *  API CLIENT — CityOfGATE Frontend
 *  Łączy frontend z backendem Google Apps Script
 * ============================================================
 */

console.log("[API] Initializing...");

let API_BASE = null;

/**
 * ============================================================
 *  1. Pobieranie URL backendu z endpointu systemowego
 * ============================================================
 */

async function loadBackendURL() {
    console.log("[API] Fetching backend URL...");

    try {
        const res = await fetch(
            "https://script.google.com/macros/s/AKfycbx0TfJOOi9wGoP_50PEVPzrSZZSCMN4tvlwt-kD_0vh51qFCnYSb3qABl_i6KkeWs-Mag/exec?path=system/webapp-url"
        );

        const data = await res.json();

        if (!data.url) {
            console.error("[API] ERROR: Backend did not return URL:", data);
            return;
        }

        API_BASE = data.url;
        console.log("[API] Backend URL loaded:", API_BASE);

    } catch (err) {
        console.error("[API] ERROR while loading backend URL:", err);
    }
}

/**
 * ============================================================
 *  2. Uniwersalny GET
 * ============================================================
 */

async function apiGET(path, params = {}) {
    if (!API_BASE) {
        console.warn("[API] API_BASE not ready, loading...");
        await loadBackendURL();
    }

    const url = new URL(API_BASE);
    url.searchParams.set("path", path);

    for (const key in params) {
        url.searchParams.set(key, params[key]);
    }

    console.log("[API] GET:", url.toString());

    try {
        const res = await fetch(url.toString());
        return await res.json();
    } catch (err) {
        console.error("[API] GET ERROR:", err);
        return { error: err.toString() };
    }
}

/**
 * ============================================================
 *  3. Uniwersalny POST
 * ============================================================
 */

async function apiPOST(path, body = {}) {
    if (!API_BASE) {
        console.warn("[API] API_BASE not ready, loading...");
        await loadBackendURL();
    }

    const url = `${API_BASE}?path=${encodeURIComponent(path)}`;

    console.log("[API] POST:", url, "BODY:", body);

    try {
        const res = await fetch(url, {
            method: "POST",
            contentType: "application/json",
            body: JSON.stringify(body)
        });

        return await res.json();
    } catch (err) {
        console.error("[API] POST ERROR:", err);
        return { error: err.toString() };
    }
}

/**
 * ============================================================
 *  4. Auto-init backend URL przy starcie aplikacji
 * ============================================================
 */

loadBackendURL();
