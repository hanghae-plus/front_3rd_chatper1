import { addEvent } from "./eventManager";

export function createElement__v2(node) {
  if (!node || typeof node === "boolean") {
    return document.createTextNode("");
  }

  if (typeof node === "string" || typeof node === "number") {
    return document.createTextNode(node);
  }

  if (Array.isArray(node)) {
    const fragment = document.createDocumentFragment();
    node.forEach((child) => {
      fragment.appendChild(createElement__v2(child));
    });
    return fragment;
  }

  const element = document.createElement(node.type);

  Object.entries(node.props || {}).forEach(([name, value]) => {
    if (name.startsWith("on") && typeof value === "function") {
      const eventType = name.toLowerCase().substring(2);
      addEvent(element, eventType, value);
    } else if (name === "className") {
      element.setAttribute("class", value);
    } else if (value === true) {
      element.setAttribute(name, "");
    } else if (value !== false && value != null) {
      element.setAttribute(name, value);
    }
  });

  (node.children || []).forEach((child) => {
    element.appendChild(createElement__v2(child));
  });

  return element;
}
