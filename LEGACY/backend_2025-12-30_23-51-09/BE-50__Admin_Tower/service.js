// backend/BE-50/service.js

// ===== Zarządzanie użytkownikami =====
export function Admin_addUser(userId, role) {
  const user = { id: "admin_user_" + Date.now(), userId, role };
  return { ok: true, user };
}

export function Admin_getUsers() {
  return [
    { id: "admin_user_01", userId: "u_01", role: "moderator" },
    { id: "admin_user_02", userId: "u_02", role: "admin" }
  ];
}

// ===== Role i uprawnienia =====
export function Admin_setRole(userId, role) {
  return { ok: true, userId, role };
}

export function Admin_getRoles() {
  return [
    { userId: "u_01", role: "moderator" },
    { userId: "u_02", role: "admin" }
  ];
}

// ===== Raporty =====
export function Admin_getReports() {
  return [
    { id: "rep_admin_01", title: "Raport Admin Tower wrzesień 2026", summary: "2 użytkowników, 3 zmiany ról" },
    { id: "rep_admin_02", title: "Raport Admin Tower październik 2026", summary: "3 użytkowników, 5 zmian ról" }
  ];
}
