export async function applyReactions(type, payload) {
  const reactions = {
    "marketplace.item.created": { reward: "marketplace.create" },
    "festival.submission.accepted": { reward: "festival.submission.accepted" },
    "festival.submission.rejected": { reward: "festival.submission.rejected" },
    "abuse.detected": { reward: "user.spam" }
  };

  const r = reactions[type];
  if (!r) return;

  if (!payload || !payload.userId) return;

  await fetch("http://localhost:3000/api/rewards/apply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: payload.userId, action: r.reward })
  });
}
