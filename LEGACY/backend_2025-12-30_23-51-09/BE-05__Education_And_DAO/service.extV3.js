// backend/BE-05/service.extV3.js

let COURSE_VERSIONS = [];
let COURSE_PROGRESS = [];
let COURSE_MENTORS = [];
let COURSE_VR_CLASSES = [];
let COURSE_SUPPORT_GROUPS = [];
let COURSE_GRANTS = [];

function now() { return new Date().toISOString(); }

// ===== Wersje kursów =====
export function Education_addCourseVersion(courseId, syllabus, actor) {
  const version = {
    id: "ver_" + Date.now(),
    courseId,
    syllabus,
    createdAt: now(),
    actor
  };
  COURSE_VERSIONS.push(version);
  return { ok: true, version };
}

// ===== Poziomy kursów =====
export function Education_setCourseLevel(courseId, level) {
  const allowed = ["beginner", "intermediate", "advanced"];
  if (!allowed.includes(level)) return { error: "Invalid level" };
  return { ok: true, courseId, level };
}

// ===== Postępy =====
export function Education_updateProgress(courseId, user, percent) {
  let p = COURSE_PROGRESS.find(x => x.courseId === courseId && x.user === user);
  if (!p) {
    p = { id: "prog_" + Date.now(), courseId, user, percent, updatedAt: now() };
    COURSE_PROGRESS.push(p);
  } else {
    p.percent = percent;
    p.updatedAt = now();
  }
  return { ok: true, progress: p };
}

export function Education_reportProgress(courseId) {
  const list = COURSE_PROGRESS.filter(p => p.courseId === courseId);
  const avg = list.reduce((s, p) => s + p.percent, 0) / (list.length || 1);
  return { courseId, average: avg, count: list.length };
}

// ===== Mentoring =====
export function Education_addMentor(userId, expertise) {
  const mentor = { id: "mnt_" + Date.now(), userId, expertise };
  COURSE_MENTORS.push(mentor);
  return { ok: true, mentor };
}

// ===== VR Classes =====
export function Education_createVRClass(title, ts) {
  const vr = { id: "vr_" + Date.now(), title, ts };
  COURSE_VR_CLASSES.push(vr);
  return { ok: true, vr };
}

// ===== Support Groups =====
export function Education_createSupportGroup(courseId, groupName) {
  const group = { id: "grp_" + Date.now(), courseId, groupName };
  COURSE_SUPPORT_GROUPS.push(group);
  return { ok: true, group };
}

export function Education_joinSupportGroup(groupId, userId) {
  return { ok: true, groupId, userId };
}

// ===== Granty =====
export function Education_requestGrant(userId, courseId, amount) {
  const grant = { id: "gr_" + Date.now(), userId, courseId, amount, status: "pending" };
  COURSE_GRANTS.push(grant);
  return { ok: true, grant };
}

export function Education_getGrants() {
  return COURSE_GRANTS;
}
