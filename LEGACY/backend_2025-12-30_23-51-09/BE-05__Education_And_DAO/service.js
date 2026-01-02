// backend/BE-05/service.js

let COURSES = Array.isArray(COURSES) ? COURSES : [];

function BE05_nowISO() {
  return new Date().toISOString();
}

// ===== Kursy edukacyjne =====
export function Education_addCourse(title, category, actor) {
  const course = {
    id: "crs_" + Date.now(),
    title,
    category: category || "general",
    createdAt: BE05_nowISO()
  };
  COURSES.push(course);
  return { ok: true, course };
}

export function Education_updateCourse(id, fields, actor) {
  const idx = COURSES.findIndex(c => c.id === id);
  if (idx < 0) return { error: "Not found" };

  COURSES[idx] = {
    ...COURSES[idx],
    ...fields,
    updatedAt: BE05_nowISO()
  };
  return { ok: true, course: COURSES[idx] };
}

export function Education_removeCourse(id) {
  const idx = COURSES.findIndex(c => c.id === id);
  if (idx < 0) return { error: "Not found" };

  const removed = COURSES.splice(idx, 1)[0];
  return { ok: true, removed };
}

export function Education_getCourses() {
  return COURSES;
}
