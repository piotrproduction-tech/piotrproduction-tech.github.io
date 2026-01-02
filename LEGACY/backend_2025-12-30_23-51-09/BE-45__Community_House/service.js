// Prosty stan w pamięci – tylko na czas dev
let COMMUNITY_GROUPS = [];
// Struktura przykładowej grupy:
// {
//   id: "grp_...",
//   name: "...",
//   createdAt: "...",
//   members: [{ id, name, joinedAt }],
//   contents: [{ id, text, status, createdAt, updatedAt }],
// }

function nowISO() {
  return new Date().toISOString();
}

// ===== Grupy =====

export function CommunityHouse_addGroup(name, actor) {
  const group = {
    id: "grp_" + Date.now(),
    name,
    createdAt: nowISO(),
    members: [],
    contents: []
  };
  COMMUNITY_GROUPS.push(group);
  return { ok: true, group, actor: actor || "user" };
}

export function CommunityHouse_removeGroup(id, actor) {
  const idx = COMMUNITY_GROUPS.findIndex(g => g.id === id);
  if (idx < 0) return { error: "Group not found" };
  const removed = COMMUNITY_GROUPS.splice(idx, 1)[0];
  return { ok: true, removed, actor: actor || "admin" };
}

export function CommunityHouse_getGroups() {
  return COMMUNITY_GROUPS;
}

// ===== Członkowie grup =====

export function CommunityHouse_addMember(groupId, userId, name) {
  const group = COMMUNITY_GROUPS.find(g => g.id === groupId);
  if (!group) return { error: "Group not found" };

  if (!group.members) group.members = [];
  const already = group.members.find(m => m.id === userId);
  if (already) return { error: "Already a member" };

  const member = { id: userId, name, joinedAt: nowISO() };
  group.members.push(member);
  return { ok: true, groupId, member };
}

export function CommunityHouse_getMembers(groupId) {
  const group = COMMUNITY_GROUPS.find(g => g.id === groupId);
  if (!group) return { error: "Group not found" };
  return { ok: true, groupId, members: group.members || [] };
}

// ===== Treści (posty w grupie) =====

export function CommunityHouse_addContent(groupId, contentId, text, authorId) {
  const group = COMMUNITY_GROUPS.find(g => g.id === groupId);
  if (!group) return { error: "Group not found" };

  if (!group.contents) group.contents = [];
  const content = {
    id: contentId || "content_" + Date.now(),
    text,
    authorId,
    status: "pending",
    createdAt: nowISO(),
    updatedAt: nowISO()
  };
  group.contents.push(content);
  return { ok: true, groupId, content };
}

// ===== Moderacja =====

export function CommunityHouse_moderateContent(groupId, contentId, action, actor) {
  const group = COMMUNITY_GROUPS.find(g => g.id === groupId);
  if (!group) return { error: "Group not found" };
  if (!group.contents) return { error: "No contents" };

  const content = group.contents.find(c => c.id === contentId);
  if (!content) return { error: "Content not found" };

  content.status = action; // 'approved' / 'rejected'
  content.updatedAt = nowISO();
  content.moderatedBy = actor || "admin";

  return { ok: true, content };
}

export function CommunityHouse_reviewContent(groupId, contentId, reviewer, decision) {
  const group = COMMUNITY_GROUPS.find(g => g.id === groupId);
  if (!group) return { error: "Group not found" };
  if (!group.contents) return { error: "No contents" };

  const content = group.contents.find(c => c.id === contentId);
  if (!content) return { error: "Content not found" };

  content.status = decision;
  content.reviewedBy = reviewer;
  content.reviewedAt = nowISO();

  return { ok: true, content };
}

// ===== Raporty aktywności =====

export function CommunityHouse_activityReport(groupId) {
  const group = COMMUNITY_GROUPS.find(g => g.id === groupId);
  if (!group) return { error: "Group not found" };

  const contents = group.contents || [];
  const posts = contents.length;
  const approved = contents.filter(c => c.status === "approved").length;
  const rejected = contents.filter(c => c.status === "rejected").length;

  return {
    ok: true,
    groupId,
    posts,
    approved,
    rejected
  };
}

// ===== Dashboard dzienny (liczba postów per dzień) =====

export function CommunityHouse_dashboardData(groupId) {
  const group = COMMUNITY_GROUPS.find(g => g.id === groupId);
  if (!group || !group.contents) return [];

  const data = {};
  group.contents.forEach(c => {
    const day = (c.createdAt || nowISO()).split("T")[0];
    data[day] = (data[day] || 0) + 1;
  });

  return Object.keys(data).map(day => ({ day, posts: data[day] }));
}

// ===== Moderacja z polityką (placeholder) =====

export function CommunityHouse_moderationWithPolicy(groupId, contentId, reviewerRole, decision) {
  // Tu w realu wszedłby PolicyEngine; na razie tylko echo:
  return {
    ok: true,
    groupId,
    contentId,
    reviewerRole,
    decision,
    result: CommunityHouse_reviewContent(groupId, contentId, reviewerRole, decision)
  };
}
