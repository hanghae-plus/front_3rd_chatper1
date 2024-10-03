import { addEvent } from "./eventManager";

const memoizedResults = new Map();

export function createElement__v2(vNode) {
  if (!vNode) {
    return document.createTextNode("");
  } else if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  } else if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => {
      fragment.appendChild(createElement__v2(child));
    });
    return fragment;
  } else if (typeof vNode.type === "function") {
    const componentVNode = vNode.type(vNode.props || {});
    return createElement__v2(componentVNode);
  } else {
    const $el = document.createElement(vNode.type);

    for (const [key, value] of Object.entries(vNode.props || {})) {
      if (key.startsWith("on") && typeof value === "function") {
        const eventType = key.slice(2).toLowerCase();
        $el.classList.add("delegate-event");
        addEvent($el, eventType, value);
      } else if (key === "className") {
        $el.setAttribute("class", value);
      } else {
        $el.setAttribute(key, value);
      }
    }

    (vNode.children || []).forEach((child) => {
      $el.appendChild(createElement__v2(child));
    });
    return $el;
  }
}
