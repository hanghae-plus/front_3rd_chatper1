import { isNullish, isTextNode } from "../utils";
import { addEvent } from "./eventManager";

export function createElement__v2(vNode) {
  if (isNullish(vNode) || typeof vNode === "boolean") {
    return document.createTextNode("");
  }
  if (isTextNode(vNode)) {
    return document.createTextNode(String(vNode));
  }
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((childVNode) => {
      const childElement = createElement__v2(childVNode);
      fragment.appendChild(childElement);
    });
    return fragment;
  }
  if (typeof vNode.type === "function") {
    const result = vNode.type(vNode.props);
    return createElement__v2(result);
  }
  const element = document.createElement(vNode.type);
  for (const [key, value] of Object.entries(vNode.props || {})) {
    if (key.startsWith("on") && typeof value === "function") {
      const eventType = key.toLowerCase().substring(2);
      addEvent(element, eventType, value);
    } else if (key === "className") {
      element.setAttribute("class", value);
    } else {
      element.setAttribute(key, value);
    }
  }
  (vNode.children || []).forEach((childVNode) => {
    const childElement = createElement__v2(childVNode);
    element.appendChild(childElement);
  });

  return element;
}
