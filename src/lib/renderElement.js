// renderElement.js
import { addEvent, removeEvent, setupEventListeners } from "./eventManager";
import { createElement__v2 } from "./createElement__v2.js";
import {
  updateChildren,
  updateComponentNode,
  updateTextNode,
} from "../utils/renderUtils.js";

// TODO: processVNode 함수 구현
function processVNode(vNode) {
  if (vNode === null || vNode === undefined || typeof vNode === "boolean") {
    return document.createTextNode("");
  }

  if (typeof vNode === "string" || typeof vNode === "number") {
    return String(vNode);
  }

  if (typeof vNode.type === "function") {
    const componentVNode = vNode.type(vNode.props || {});
    return processVNode(componentVNode);
  }
  return {
    ...vNode,
    children: vNode.children.map(processVNode).filter(Boolean),
  };
}

// TODO: updateAttributes 함수 구현
function updateAttributes(target, newProps = {}, oldProps = {}) {
  if (!target || typeof target.setAttribute !== "function") {
    return;
  }

  for (const [attr, value] of Object.entries(newProps)) {
    if (oldProps[attr] === value) continue;
    if (attr.startsWith("on")) {
      const eventType = attr.slice(2).toLowerCase();

      //  이전 리스너가 있을 경우 제거한다
      if (oldProps[attr]) {
        removeEvent(target, eventType, oldProps[attr]);
      }
      //  새로운 리스너를 추가
      if (value) {
        addEvent(target, eventType, value);
      }
    } else if (attr === "className") {
      target.setAttribute("class", value);
    } else if (attr === "style" && typeof value === "object") {
      Object.assign(target.style, value);
    } else {
      target.setAttribute(attr, value);
    }
  }

  for (const attr in oldProps) {
    if (!(attr in newProps)) {
      if (attr.startsWith("on")) {
        const eventType = attr.slice(2).toLowerCase();
        removeEvent(target, eventType, oldProps[attr]);
      } else if (attr === "className") {
        target.removeAttribute("class");
      } else {
        target.removeAttribute(attr);
      }
    }
  }
}

// TODO: updateElement 함수 구현
export function updateElement(parent, newNode, oldNode, index = 0) {
  if (!parent) return;
  const existingDOMElement = parent.childNodes[index];

  if (!newNode) {
    if (oldNode) {
      parent.removeChild(existingDOMElement);
    }
    return;
  }
  if (!oldNode) {
    parent.appendChild(createElement__v2(newNode));
    return;
  }

  if (typeof newNode === "string" || typeof oldNode === "string") {
    updateTextNode(parent, newNode, oldNode, existingDOMElement);
    return;
  }

  if (typeof newNode.type === "function") {
    updateComponentNode(parent, newNode, oldNode, existingDOMElement, index);
    return;
  }

  if (newNode.type !== oldNode.type) {
    const newElement = createElement__v2(newNode);
    parent.replaceChild(newElement, existingDOMElement);
    return;
  }

  updateAttributes(
    existingDOMElement,
    newNode.props || {},
    oldNode.props || {}
  );
  updateChildren(existingDOMElement, newNode.children, oldNode.children);
}

export function renderElement(vNode, container) {
  const newVNode = processVNode(vNode);
  const oldVNode = container._vNode;

  if (!oldVNode) {
    container.appendChild(createElement__v2(newVNode));
  } else {
    if (JSON.stringify(newVNode) === JSON.stringify(oldVNode)) {
      return;
    } else {
      updateElement(container, newVNode, oldVNode);
    }
  }
  container._vNode = newVNode;
  setupEventListeners(container);
}
