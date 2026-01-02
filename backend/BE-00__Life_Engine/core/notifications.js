const MESSAGES = {
  "marketplace.item.created": "Nowa oferta na Marketplace Street",
  "festival.submission.accepted": "Zgłoszenie zaakceptowane w Festival District",
  "festival.submission.rejected": "Zgłoszenie odrzucone w Festival District",
  "creator.level.upgraded": "Twórca awansował na wyższy poziom"
};

export function sendNotification(type, payload) {
  const message = MESSAGES[type];
  if (!message) return;

  fetch("http://localhost:3000/api/city/notify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, payload })
  }).catch(() => {});
}
