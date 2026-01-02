// backend/BE-51/service.js

// ===== Kursy edukacyjne =====
export function Education_addCourse(title, description, level) {
  const course = { id: "edu_course_" + Date.now(), title, description, level };
  return { ok: true, course };
}

export function Education_getCourses() {
  return [
    { id: "edu_course_01", title: "Podstawy DAO", description: "Wprowadzenie do zdecentralizowanej organizacji", level: "beginner" },
    { id: "edu_course_02", title: "Zaawansowane VR", description: "Tworzenie immersyjnych doświadczeń", level: "advanced" }
  ];
}

// ===== Rejestracje =====
export function Education_register(userId, courseId) {
  const registration = { id: "edu_reg_" + Date.now(), userId, courseId };
  return { ok: true, registration };
}

export function Education_getRegistrations(courseId) {
  return [
    { id: "edu_reg_01", courseId, userId: "u_01" },
    { id: "edu_reg_02", courseId, userId: "u_02" }
  ];
}

// ===== Integracja z DAO =====
export function Education_linkDAO(courseId, proposalId) {
  return { ok: true, courseId, proposalId };
}

// ===== Raporty =====
export function Education_getReports() {
  return [
    { id: "rep_edu_01", title: "Raport Education & DAO sierpień 2026", summary: "2 kursy, 15 rejestracji" },
    { id: "rep_edu_02", title: "Raport Education & DAO wrzesień 2026", summary: "3 kursy, 25 rejestracji" }
  ];
}
