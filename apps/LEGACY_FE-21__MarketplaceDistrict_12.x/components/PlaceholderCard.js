// components/PlaceholderCard.js

export function renderPlaceholderCard({ title, body, icon = "📍" }) {
  return {
    type: "PlaceholderCard",
    title,
    body,
    icon,
    timestamp: Date.now()
  };
}
