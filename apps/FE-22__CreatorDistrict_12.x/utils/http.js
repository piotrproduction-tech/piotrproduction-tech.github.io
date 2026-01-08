export async function httpGet(url, options = {}) {
    const res = await fetch(url, { method: "GET", ...options });
    if (!res.ok) throw new Error(`HTTP GET ${url} failed: ${res.status}`);
    return res.json();
  }

  export async function httpPost(url, body, options = {}) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      body: JSON.stringify(body),
      ...options
    });
    if (!res.ok) throw new Error(`HTTP POST ${url} failed: ${res.status}`);
    return res.json();
  }

