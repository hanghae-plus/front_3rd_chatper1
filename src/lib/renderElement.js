import { addEvent, removeEvent, setupEventListeners } from './eventManager';
import { createElement__v2 } from './createElement__v2.js';

function processVNode(vNode) {
  if (!vNode || typeof vNode === 'boolean') {
    return '';
  }

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return String(vNode);
  }

  if (typeof vNode.type === 'function') {
    return processVNode(vNode.type(vNode.props || {}));
  }

  return {
    ...vNode,
    children: vNode.children.map(processVNode).filter(Boolean) ?? []
  };
}

function updateAttributes(targetEl, newVNodeProps, oldVNodeProps) {
  for (const [key, value] of Object.entries(newVNodeProps)) {
    if (key.startsWith('on') && typeof value === 'function') {
      const eventType = key.slice(2).toLowerCase();
      const oldEventHandler = oldVNodeProps[key];

      if (value === oldEventHandler) {
        continue;
      }

      oldEventHandler && removeEvent(targetEl, eventType, oldEventHandler);
      value && addEvent(eventType, targetEl, value);
    } else if (key === 'className') {
      targetEl.setAttribute('class', value ?? '');
    } else if (key === 'style') {
      Object.assign(targetEl.style, value);
    } else {
      targetEl.setAttribute(key, value);
    }
  }

  for (const [key, value] of Object.entries(oldVNodeProps)) {
    if (key in newVNodeProps) {
      continue;
    }

    if (key.startsWith('on')) {
      const eventType = key.slice(2).toLowerCase();
      removeEvent(targetEl, eventType, value);
    } else {
      targetEl.removeAttribute(key);
    }
  }
}

function updateElement(parent, newVNode, oldVNode, index = 0) {
  const actualNode = parent.childNodes[index];

  if (!newVNode && oldVNode) {
    return actualNode && parent.removeChild(parent.childNodes[index]);
  }

  if (newVNode && !oldVNode) {
    return parent.appendChild(createElement__v2(newVNode));
  }

  if (typeof newVNode === 'string' || typeof oldVNode === 'string') {
    if (newVNode !== oldVNode) {
      return parent.replaceChild(document.createTextNode(newVNode), actualNode);
    }
    return;
  }

  if (newVNode.type !== oldVNode.type) {
    return parent.replaceChild(createElement__v2(newVNode), parent.childNodes[index]);
  }

  updateAttributes(actualNode, newVNode.props ?? {}, oldVNode.props ?? {});

  const newVNodeChildren = newVNode.children ?? [];
  const oldVNodeChildren = oldVNode.children ?? [];
  const maxLength = Math.max(newVNodeChildren.length, oldVNodeChildren.length);

  for (let i = 0; i < maxLength; i++) {
    updateElement(actualNode, newVNodeChildren[i], oldVNodeChildren[i], i);
  }

  while (actualNode.childNodes.length > newVNodeChildren.length) {
    actualNode.removeChild(actualNode.lastChild);
  }
}

export function renderElement(vNode, container) {
  const newVNode = processVNode(vNode);
  const oldVNode = container._vNode;

  updateElement(container, newVNode, oldVNode);

  container._vNode = vNode;

  setupEventListeners(container);
}