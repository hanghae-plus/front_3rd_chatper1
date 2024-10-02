// renderElement.js
import { addEvent, removeEvent, setupEventListeners } from './eventManager';
import { createElement__v2 } from './createElement__v2.js';

function processVNode(vNode) {
  if (vNode === null || vNode === undefined || typeof vNode === 'boolean') {
    return '';
  }

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return String(vNode);
  }

  if (typeof vNode.type === 'function') {
    return processVNode(vNode.type(vNode.props));
  }

  if (Array.isArray(vNode)) {
    return vNode.map(processVNode);
  }

  if (typeof vNode === 'object') {
    const children = Array.isArray(vNode.children) ? vNode.children.map(processVNode) : processVNode(vNode.children);
    return { ...vNode, children };
  }

  return vNode;
}

function updateAttributes(element, oldProps, newProps) {
  Object.keys(oldProps).forEach((key) => {
    if (!(key in newProps)) {
      if (key.startsWith('on') && typeof oldProps[key] === 'function') {
        const eventType = key.slice(2).toLowerCase();
        // removeEvent(element, eventType, oldProps[key]);
        element.removeEventListener(eventType, oldProps[key]);
      } else {
        element.removeAttribute(key);
      }
    }
  });

  Object.keys(newProps).forEach((key) => {
    const newValue = newProps[key];
    const oldValue = oldProps[key];

    // 이벤트 리스너 추가 및 업데이트
    if (key.startsWith('on') && typeof newValue === 'function') {
      const eventType = key.slice(2).toLowerCase();
      if (oldValue !== newValue) {
        if (oldValue) {
          // removeEvent(element, eventType, oldValue);
          element.removeEventListener(eventType, oldValue);
        }
        // addEvent(element, eventType, newValue);
        element.addEventListener(eventType, newValue);
      }
    } else if (key === 'className') {
      if (newValue !== oldValue) {
        element.className = newValue;
      }
    } else if (key === 'style' && typeof newValue === 'object') {
      Object.keys(newValue).forEach((styleName) => {
        if (newValue[styleName] !== oldValue?.[styleName]) {
          element.style[styleName] = newValue[styleName];
        }
      });

      Object.keys(oldValue || {}).forEach((styleName) => {
        if (!(styleName in newValue)) {
          element.style[styleName] = '';
        }
      });
    } else {
      if (newValue !== oldValue) {
        element.setAttribute(key, newValue);
      }
    }
  });
}

function updateElement(container, oldVNode, newVNode, index = 0) {
  const oldElement = container.childNodes[index];
  const newElement = createElement__v2(newVNode);

  if (!newVNode && oldVNode) {
    container.removeChild(oldElement);
    return;
  }

  if (newVNode && !oldVNode) {
    container.appendChild(newElement);
    return;
  }

  if (typeof newVNode === 'string' || typeof newVNode === 'number') {
    if (newVNode !== oldVNode) {
      container.replaceChild(newElement, oldElement);
    }
    return;
  }

  if (newVNode.type !== oldVNode.type) {
    container.replaceChild(newElement, oldElement);
    return;
  }

  updateAttributes(oldElement, oldVNode.props || {}, newVNode.props || {});

  const oldChildren = oldVNode.children;
  const newChildren = newVNode.children;
  const maxLen = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < maxLen; i++) {
    if (i < newChildren.length) {
      updateElement(oldElement, oldChildren[i], newChildren[i], i);
    } else if (i < oldChildren.length) {
      oldElement.removeChild(oldElement.childNodes[i]);
    }
  }
}

export function renderElement(vNode, container) {
  const oldVNode = container._vNode;
  const newVNode = processVNode(vNode);

  if (!oldVNode) {
    const newElement = createElement__v2(newVNode);
    container.appendChild(newElement);
  } else {
    updateElement(container, oldVNode, newVNode);
  }

  container._vNode = newVNode;

  setupEventListeners();
}
