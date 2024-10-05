import { addEvent, removeEvent, setupEventListeners } from './eventManager';
import { createElement__v2 } from './createElement__v2.js';

export function processVNode(vNode) {
  if (vNode == null || typeof vNode === 'boolean') {
    return null;
  }

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return String(vNode);
  }

  if (typeof vNode.type === 'function') {
    const props = vNode.props || {};
    const childVNode = vNode.type(props);
    return processVNode(childVNode);
  }

  const processedChildren = (vNode.children || []).map(processVNode);

  return {
    ...vNode,
    children: processedChildren,
  };
}

function updateAttributes(element, newProps = {}, oldProps = {}) {
  for (const [key, value] of Object.entries(oldProps)) {
    if (key.startsWith('on') && typeof value === 'function') {
      const eventType = key.slice(2).toLowerCase();
      removeEvent(element, eventType, value);
    }
  }

  for (const [key, value] of Object.entries(newProps)) {
    if (key.startsWith('on') && typeof value === 'function') {
      const eventType = key.slice(2).toLowerCase();
      addEvent(element, eventType, value);
    } else if (key === 'className') {
      element.setAttribute('class', value);
    } else if (key !== 'children') {
      element.setAttribute(key, value);
    }
  }
}

function updateElement(container, oldNode, newNode) {
  if (!newNode) return;

  if (!oldNode) {
    const newElement = createElement__v2(newNode);
    container.appendChild(newElement);
    return;
  }

  if (typeof newNode === 'string' || typeof newNode === 'number') {
    if (oldNode.nodeValue !== newNode) {
      oldNode.nodeValue = newNode;
    }

    return;
  }

  if (oldNode.nodeName.toLowerCase() !== (newNode.type || '').toLowerCase()) {
    const newElement = createElement__v2(newNode);
    container.replaceChild(newElement, oldNode);
    return;
  }

  updateAttributes(oldNode, newNode.props || {}, oldNode.vProps || {});

  const oldChildren = Array.from(oldNode.childNodes);
  const newChildren = newNode.children || [];
  const maxLength = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < maxLength; i++) {
    updateElement(oldNode, oldChildren[i], newChildren[i], i);
  }

  while (oldNode.childNodes.length > newChildren.length) {
    oldNode.removeChild(oldNode.lastChild);
  }
}

export function renderElement(vNode, container) {
  vNode = processVNode(vNode);

  const oldNode = container.firstChild;

  if (oldNode) {
    updateElement(container, oldNode, vNode);
  } else {
    const newElement = createElement__v2(vNode);
    container.appendChild(newElement);
  }

  setupEventListeners(container);
}
