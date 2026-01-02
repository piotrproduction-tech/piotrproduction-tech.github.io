// Prosty stan w pamięci – tylko na czas dev
let VOLUNTEER_TASKS = [];
let VOLUNTEER_OPPORTUNITIES = [
  { id: "vol_01", name: "Wsparcie festiwalu", slots: 12 },
  { id: "vol_02", name: "Mentoring młodzieży", slots: 8 }
];

function nowISO() {
  return new Date().toISOString();
}

// ===== Zadania wolontariuszy =====

export function Volunteer_addTask(task, volunteer, actor) {
  const assignment = {
    id: "tsk_" + Date.now(),
    task,
    volunteer,
    createdAt: nowISO(),
    status: "assigned"
  };
  VOLUNTEER_TASKS.push(assignment);
  return { ok: true, assignment, actor: actor || "user" };
}

export function Volunteer_removeTask(id, actor) {
  const idx = VOLUNTEER_TASKS.findIndex(t => t.id === id);
  if (idx < 0) return { error: "Task not found" };
  const removed = VOLUNTEER_TASKS.splice(idx, 1)[0];
  return { ok: true, removed, actor: actor || "admin" };
}

export function Volunteer_getTasks() {
  return VOLUNTEER_TASKS;
}

// ===== Statusy =====

export function Volunteer_updateStatus(taskId, status, actor) {
  const task = VOLUNTEER_TASKS.find(t => t.id === taskId);
  if (!task) return { error: "Task not found" };
  task.status = status;
  task.updatedAt = nowISO();
  return { ok: true, task, actor: actor || "admin" };
}

// ===== Raport godzin =====

export function Volunteer_reportHours(volunteer) {
  const tasks = VOLUNTEER_TASKS.filter(t => t.volunteer === volunteer && t.hours);
  const total = tasks.reduce((sum, t) => sum + t.hours, 0);
  return { volunteer, totalHours: total, tasks: tasks.length };
}

// ===== Oferty wolontariatu =====

export function Volunteer_getOpportunities() {
  return VOLUNTEER_OPPORTUNITIES;
}
