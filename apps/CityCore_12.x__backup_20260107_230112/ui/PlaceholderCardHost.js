// ui/PlaceholderCardHost.js

export function renderPlaceholderCardHost(card) {
  return {
    type: "UIElement",
    element: "PlaceholderCard",
    title: card.title,
    body: card.body,
    icon: card.icon,
    timestamp: card.timestamp,
    style: {
      padding: "16px",
      borderRadius: "12px",
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.15)",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }
  };
}

