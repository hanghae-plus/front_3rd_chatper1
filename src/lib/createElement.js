import {reactNamesToTopLevelEvents, registerSimpleEvents} from "./DomEventProperties.js";
import {isFalsyDom} from "../utils/isFalsyDom.js";

registerSimpleEvents();

export function createElement(vNode) {
  if (isFalsyDom(vNode)) return document.createTextNode('')

  if (typeof vNode === "number" || typeof vNode === "string") return document.createTextNode(vNode + "");

  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();

    vNode.forEach((childNode) => {
      fragment.appendChild(createElement(childNode));
    })

    return fragment;
  }

  if (typeof vNode.type === "function") {
    return createElement(vNode.type(vNode.props));

  }

  const domNode = document.createElement(vNode.type);

  Object.entries(vNode.props ?? {}).forEach(([key, value]) => {
      if (key.startsWith("on")) {
        domNode.addEventListener(reactNamesToTopLevelEvents.get(key), value);
      }

      if (key.includes("data-")) {
        domNode.setAttribute(key, value);
      }

      domNode[key] = value;
    })

  vNode?.children?.forEach((child) => {
    domNode.appendChild(createElement(child));
  })

  return domNode;
}
