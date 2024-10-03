import { isEmpty, isFalsy } from "../utils";
import { eventMap } from "./eventManager";

export function createVNode(type, props, ...children) {
  const fChildren = children.flat(Infinity).filter((child) => !isFalsy(child));
  return { type, props, children: fChildren };
}

export function elementToVNode(element) {
  const { tagName, attributes, childNodes } = element;

  const vNode = {
    type: tagName.toLowerCase(),
    props: {},
    children: [],
  };

  for (const attr of attributes) {
    // node에는 class, vNode에는 className
    if (attr.name === "class") {
      vNode.props["className"] = attr.value;
    } else {
      vNode.props[attr.name] = attr.value;
    }
  }
  // event props는 따로 처리
  eventMap.forEach((handlers, eventType) => {
    if (handlers.has(element)) {
      const handler = handlers.get(element);
      const eventName = `on${upperFirstChar(eventType)}`;
      vNode.props[eventName] = handler;
    }
  });

  for (const child of childNodes) {
    if (child.nodeType === Node.TEXT_NODE) {
      vNode.children.push(child.nodeValue);
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      vNode.children.push(elementToVNode(child));
    }
  }

  return createVNode(
    vNode.type,
    isEmpty(vNode.props) ? null : vNode.props,
    vNode.children
  );
}

function upperFirstChar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
