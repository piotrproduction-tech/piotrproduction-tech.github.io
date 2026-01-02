// Prosty stan w pamięci – tylko na czas dev
let COMMUNITY_POSTS = [];
let COMMUNITY_COMMENTS = [];
let COMMUNITY_LIKES = [];
let COMMUNITY_EVENT_SIGNUPS = [];
let COMMUNITY_INITIATIVES = [];
let COMMUNITY_VOLUNTEER_OFFERS = [
  { id: "vol_01", name: "Wsparcie festiwalu", slots: 12 },
  { id: "vol_02", name: "Mentoring młodzieży", slots: 8 }
];
let COMMUNITY_YOUTH_PROGRAMS = [
  { id: "y_01", name: "Młodzi Twórcy" },
  { id: "y_02", name: "Start w kulturze" }
];

// ===== Dashboard & raporty =====

export function Community_getDashboard(userId) {
  // Prosty agregat na podstawie pamięci
  const posts = COMMUNITY_POSTS.filter(p => p.userId === userId).length;
  const likes = COMMUNITY_LIKES.filter(l => l.userId === userId).length;
  const events = COMMUNITY_EVENT_SIGNUPS.filter(e => e.userId === userId).length;

  return {
    userId,
    stats: {
      posts,
      likes,
      events
    }
  };
}

export function Community_getReports(range) {
  return {
    range: range || "30d",
    engagement: 0.72,
    topics: ["Festiwal", "VR", "Mentoring"]
  };
}

// ===== Wolontariat & programy =====

export function Community_getVolunteerOpportunities() {
  return COMMUNITY_VOLUNTEER_OFFERS;
}

export function Community_getYouthPrograms() {
  return COMMUNITY_YOUTH_PROGRAMS;
}

// ===== Interakcje — posty, komentarze, lajki, zapisy =====

export function Community_createPost(userId, content) {
  const post = {
    id: "p_" + Date.now(),
    userId,
    content,
    ts: new Date().toISOString()
  };
  COMMUNITY_POSTS.push(post);
  return { ok: true, post };
}

export function Community_comment(postId, userId, text) {
  const comment = {
    id: "c_" + Date.now(),
    postId,
    userId,
    text,
    ts: new Date().toISOString()
  };
  COMMUNITY_COMMENTS.push(comment);
  return { ok: true, comment };
}

export function Community_like(postId, userId) {
  const like = { id: "l_" + Date.now(), postId, userId, ts: new Date().toISOString() };
  COMMUNITY_LIKES.push(like);
  return { ok: true, postId, userId };
}

export function Community_eventSignup(eventId, userId) {
  const signup = { id: "e_" + Date.now(), eventId, userId, ts: new Date().toISOString() };
  COMMUNITY_EVENT_SIGNUPS.push(signup);
  return { ok: true, eventId, userId };
}

export function Community_moderation(action, targetId) {
  return { ok: true, action, targetId };
}
