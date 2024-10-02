import { addEvent } from './eventManager';
import { processVNode } from './renderElement';

export function createElement__v2(vNode) {
  vNode = processVNode(vNode);

  if (!vNode) {
    return document.createTextNode('');
  }

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(vNode);
  }

  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => {
      fragment.appendChild(createElement__v2(child));
    });
    return fragment;
  }

  if (!vNode.type) {
    console.error('Invalid vNode:', vNode);
    return document.createTextNode('');
  }

  const element = document.createElement(vNode.type);

  element.vProps = vNode.props || {};

  for (const [key, value] of Object.entries(vNode.props || {})) {
    if (key.startsWith('on') && typeof value === 'function') {
      const eventType = key.slice(2).toLowerCase();
      addEvent(element, eventType, value);
    } else if (key === 'className') {
      element.className = value;
    } else {
      element.setAttribute(key, value);
    }
  }

  (vNode.children || []).forEach((child) => {
    element.appendChild(createElement__v2(child));
  });
  return element;
}
