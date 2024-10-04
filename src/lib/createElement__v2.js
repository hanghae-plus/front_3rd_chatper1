import { isFalsyDom } from "../utils/isFalsyDom.js";
import { addEvent } from "./eventManager.js";

export function createElement__v2(vNode) {
  if (isFalsyDom(vNode)) {
    return document.createTextNode("");
  }

  if (typeof vNode === "string") return document.createTextNode(vNode + "");

  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();

    vNode.forEach((childNode) => {
      fragment.appendChild(createElement__v2(childNode));
    });

    return fragment;
  }

  const domNode = document.createElement(vNode.type);

  Object.entries(vNode.props ?? {}).forEach(([key, value]) => {
    if (key.startsWith("on")) {
      addEvent(domNode, key, value);
    }

    if (key.includes("data-")) {
      domNode.setAttribute(key, value);
    }

    domNode[key] = value;
  });

  const children = vNode.children ?? [];

  children.forEach((child) => {
    domNode.appendChild(createElement__v2(child));
  });

  return domNode;
}
