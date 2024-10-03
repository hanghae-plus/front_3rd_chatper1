import { createElement__v2 } from "./createElement__v2";
import { addEvent, removeEvent, setupEventListeners } from "./eventManager";

const processVNode = (vNode) => {
  if (!vNode || typeof vNode === "boolean") return "";
  if (typeof vNode === "string" || typeof vNode === "number")
    return String(vNode);
  if (typeof vNode.type === "function") {
    const { type: component, props } = vNode;
    return processVNode(component(props));
  }

  const processedChildren = (vNode.children || []).map(processVNode);
  return {
    type: vNode.type,
    props: vNode.props || {},
    children: processedChildren,
  };
};

const updateAttributes = (oldElement, oldProps = {}, newProps = {}) => {
  Object.entries(oldProps).forEach(([attr, value]) => {
    if (!(attr in newProps)) {
      if (attr.startsWith("on")) {
        removeEvent(oldElement, attr.slice(2).toLowerCase(), value);
      } else {
        oldElement.removeAttribute(attr);
      }
    }
  });

  Object.entries(newProps).forEach(([attr, value]) => {
    if (attr.startsWith("on") && typeof value === "function") {
      const eventType = attr.slice(2).toLowerCase();
      const oldEventHandler = oldProps[attr];
      if (value !== oldEventHandler) {
        oldEventHandler && removeEvent(oldElement, eventType, oldEventHandler);
        value && addEvent(eventType, oldElement, value);
      }
    } else if (attr === "className") {
      oldElement.setAttribute("class", value || "");
    } else if (attr === "style") {
      Object.assign(oldElement.style, value);
    } else {
      oldElement.setAttribute(attr, value);
    }
  });
};

const updateElement = (container, oldNode, newNode, index = 0) => {
  const oldElement = container.childNodes[index];

  if (!newNode && oldNode) {
    oldElement && container.removeChild(oldElement);
    return;
  }

  if (newNode && !oldNode) {
    container.appendChild(createElement__v2(newNode));
    return;
  }

  if (
    ["string", "number"].includes(typeof newNode) &&
    ["string", "number"].includes(typeof oldNode) &&
    newNode !== oldNode
  ) {
    container.replaceChild(document.createTextNode(newNode), oldElement);
    return;
  }

  if (newNode.type !== oldNode?.type) {
    const newElement = createElement__v2(newNode);
    oldElement
      ? container.replaceChild(newElement, oldElement)
      : container.appendChild(newElement);
    return;
  }

  if (!oldElement) return;

  updateAttributes(oldElement, oldNode.props || {}, newNode.props || {});

  const oldChildren = oldNode.children || [];
  const newChildren = newNode.children || [];
  const maxChildrenLength = Math.max(oldChildren.length, newChildren.length);

  Array.from({ length: maxChildrenLength }).forEach((_, i) =>
    updateElement(oldElement, oldChildren[i], newChildren[i], i)
  );

  while (oldElement.childNodes.length > newChildren.length) {
    oldElement.removeChild(oldElement.lastChild);
  }
};

export const renderElement = (vNode, container) => {
  const oldVNode = container?.oldVNode;
  const newVNode = processVNode(vNode);

  oldVNode
    ? updateElement(container, oldVNode, newVNode)
    : container.appendChild(createElement__v2(newVNode));

  container.oldVNode = newVNode;
  setupEventListeners(container);
};
