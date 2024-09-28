import { addEvent, removeEvent, setupEventListeners } from './eventManager';
import { createElement__v2 } from "./createElement__v2.js";

function processVNode(vNode) {
  if (vNode == null || typeof vNode === 'boolean') {
    return null;
  }

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return String(vNode);
  }

  if (typeof vNode.type === 'function') {
    return processVNode(vNode.type(vNode.props));
  }

  return {
    ...vNode,
    children: vNode.children.map(processVNode).filter(Boolean)
  };
}

function updateAttributes(target, originNewProps, originOldProps) {
  const newProps = originNewProps || {};
  const oldProps = originOldProps || {};

  // 이전 props의 모든 키를 순회
  for (const attr in oldProps) {
    if (!(attr in newProps)) {
      // 새 props에 없는 속성 제거
      if (attr.startsWith('on') && typeof oldProps[attr] === 'function') {
        const eventType = attr.toLowerCase().slice(2);
        removeEvent(target, eventType, oldProps[attr]);
      } else {
        target.removeAttribute(attr);
      }
    }
  }

  // 새 props의 모든 키를 순회
  for (const attr in newProps) {
    if (oldProps[attr] !== newProps[attr]) {
      if (attr === 'className') {
        target.className = newProps[attr];
      } else if (attr.startsWith('on') && typeof newProps[attr] === 'function') {
        const eventType = attr.toLowerCase().slice(2);
        if (typeof oldProps[attr] === 'function') {
          removeEvent(target, eventType, oldProps[attr]);
        }
        addEvent(target, eventType, newProps[attr]);
      } else if (attr === 'style' && typeof newProps[attr] === 'object') {
        Object.assign(target.style, newProps[attr]);
      } else {
        target.setAttribute(attr, newProps[attr]);
      }
    }
  }
}

function updateElement(parentElement, newNode, oldNode, index = 0) {
  if (!newNode && oldNode) {
    parentElement.removeChild(parentElement.childNodes[index]);
    return;
  }

  if (newNode && !oldNode) {
    parentElement.appendChild(createElement__v2(newNode));
    return;
  }

  if (typeof newNode === "string" || typeof newNode === "number") {
    if (newNode !== oldNode) {
      const newTextNode = document.createTextNode(String(newNode));
      parentElement.replaceChild(newTextNode, parentElement.childNodes[index]);
    }
    return;
  }

  if (newNode.type !== oldNode.type) {
    parentElement.replaceChild(createElement__v2(newNode), parentElement.childNodes[index]);
    return;
  }

  updateAttributes(parentElement.childNodes[index], newNode.props || {}, oldNode.props || {});

  const newChildren = newNode.children || [];
  const oldChildren = oldNode.children || [];
  const maxLength = Math.max(newChildren.length, oldChildren.length);

  for (let i = 0; i < maxLength; i++) {
    updateElement(
      parentElement.childNodes[index],
      newChildren[i],
      oldChildren[i],
      i
    );
  }

  while (parentElement.childNodes[index].childNodes.length > newChildren.length) {
    parentElement.childNodes[index].removeChild(
      parentElement.childNodes[index].lastChild
    );
  }
}

const containerVNodeMap = new WeakMap();

export function renderElement(vNode, container) {
  const oldNode = containerVNodeMap.get(container);
  const newNode = processVNode(vNode);

  if (!oldNode) {
    container.appendChild(createElement__v2(newNode))
  } else {
    updateElement(container, newNode, oldNode);
  }

  containerVNodeMap.set(container, newNode);
  setupEventListeners(container);
}
