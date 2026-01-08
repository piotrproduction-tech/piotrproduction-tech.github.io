// ui/renderUIElement.js

export function renderUIElement(element) {
  if (!element || typeof element !== "object") {
    return { type: "InvalidElement", raw: element };
  }

  switch (element.type) {
    case "PlaceholderCard":
      return {
        component: "PlaceholderCard",
        title: element.title,
        body: element.body,
        icon: element.icon,
        timestamp: element.timestamp,
        style: element.style || {}
      };

    case "UIElement":
      return {
        component: element.element,
        ...element
      };

    default:
      return {
        component: "UnknownElement",
        raw: element
      };
  }
}

