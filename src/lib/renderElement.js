import { addEvent, removeEvent, setupEventListeners } from "./eventManager";
import { createElement__v2 } from "./createElement__v2.js";

function processVNode(vNode) {
  if (vNode == null || typeof vNode === "boolean") {
    return "";
  }
  if (typeof vNode === "string" || typeof vNode === "number") {
    return vNode.toString();
  }
  if (typeof vNode === "function") {
    return processVNode(vNode());
  }
  if (Array.isArray(vNode)) {
    return vNode.map((child) => processVNode(child));
  }
  if (typeof vNode.type === "function") {
    return processVNode(vNode.type(vNode.props || {}));
  }
  return {
    ...vNode,
    children: vNode.children.map((child) => processVNode(child)),
  };
}

function updateAttributes(element, newProps, oldProps) {
  for (const name in oldProps) {
    if (!(name in newProps)) {
      if (name.startsWith("on") && typeof oldProps[name] === "function") {
        const eventType = name.toLowerCase().substring(2);
        removeEvent(element, eventType, oldProps[name]);
      } else if (name === "className") {
        element.removeAttribute("class");
      } else {
        element.removeAttribute(name);
      }
    }
  }

  for (const name in newProps) {
    if (oldProps[name] !== newProps[name]) {
      if (name.startsWith("on") && typeof newProps[name] === "function") {
        const eventType = name.toLowerCase().substring(2);
        if (typeof oldProps[name] === "function") {
          removeEvent(element, eventType, oldProps[name]);
        }
        addEvent(element, eventType, newProps[name]);
      } else if (name === "className") {
        element.setAttribute("class", newProps[name]);
        element.removeAttribute("className");
      } else if (newProps[name] === true) {
        element.setAttribute(name, "");
      } else if (newProps[name] === false || newProps[name] == null) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, newProps[name]);
      }
    }
  }
}

function updateElement(parent, newNode, oldNode, index = 0) {
  const newChildNodes = createElement__v2(newNode);
  const oldChildNodes = parent.childNodes[index];
  if (!newNode && oldNode) {
    parent.removeChild(oldChildNodes);
    return;
  }

  if (newNode && !oldNode) {
    parent.appendChild(newChildNodes);
    return;
  }

  if (
    (typeof newNode === "string" || typeof newNode === "number") &&
    (typeof oldNode === "string" || typeof oldNode === "number")
  ) {
    if (newNode !== oldNode) {
      oldChildNodes.textContent = newNode;
    }
    return;
  }

  if (typeof newNode === "function") {
    updateElement(
      parent,
      newNode(),
      oldNode && typeof oldNode === "function" ? oldNode() : oldNode,
      index
    );
    return;
  }

  if (typeof newNode.type === "function") {
    const newVNode = newNode.type(newNode.props || {});
    const oldVNode =
      oldNode && oldNode.type === newNode.type
        ? oldNode.type(oldNode.props || {})
        : null;
    updateElement(parent, newVNode, oldVNode, index);
    return;
  }

  if (!oldNode || newNode.type !== oldNode.type) {
    if (oldNode) {
      parent.replaceChild(newChildNodes, oldChildNodes);
    } else {
      parent.appendChild(newChildNodes);
    }
    return;
  }

  updateAttributes(
    parent.childNodes[index],
    newNode.props || {},
    oldNode.props || {}
  );

  const newChildren = newNode.children || [];
  const oldChildren = oldNode.children || [];
  const maxLength = Math.max(newChildren.length, oldChildren.length);

  for (let i = 0; i < maxLength; i++) {
    updateElement(parent.childNodes[index], newChildren[i], oldChildren[i], i);
  }

  while (parent.childNodes[index].childNodes.length > newChildren.length) {
    parent.childNodes[index].removeChild(parent.childNodes[index].lastChild);
  }
}

export function renderElement(vNode, container) {
  const newVNode = processVNode(vNode);
  const oldVNode = container._vNode;

  if (!oldVNode) {
    container.innerHTML = "";
    const element = createElement__v2(newVNode);
    container.appendChild(element);
  } else {
    updateElement(container, newVNode, container._vNode);
  }

  container._vNode = newVNode;

  setupEventListeners(container);
}
