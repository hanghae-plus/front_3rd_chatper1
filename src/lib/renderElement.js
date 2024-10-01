import { createElement__v2 } from './createElement__v2.js';
import { addEvent, removeEvent, setupEventListeners } from './eventManager';
import { flatObject } from './flatObject.js';

function updateAttributes(newElement, oldElement) {
  const newNodeAttributes = [...newElement.attributes, ...flatObject(newElement._vNode?.props)];
  const oldNodeAttributes = [...oldElement.attributes, ...flatObject(oldElement._vNode?.props)];

  for (const { name, value } of newNodeAttributes) {
    if (name.startsWith('on')) {
      addEvent(oldElement, name.slice(2).toLowerCase(), value);
      oldElement._vNode = newElement._vNode;
    } else {
      if (name === 'style') {
        const ObjStyleToStringStyle = Object.entries(value)
          .reduce((acc, [key, value]) => {
            const _key = key.replaceAll(/([A-Z])/g, '-$1').toLowerCase();
            const _value = typeof value === 'string' ? value : `${value}px`;
            return acc + `${_key}: ${_value}; `;
          }, '')
          .trim();
        oldElement.setAttribute(name, ObjStyleToStringStyle);
      } else {
        const _key = name === 'className' ? 'class' : name;
        oldElement.setAttribute(_key, value);
      }
    }
  }
  for (const { name } of oldNodeAttributes) {
    if (!newElement.getAttribute(name) && !newNodeAttributes.map((item) => item.name).includes(name)) {
      if (name.startsWith('on')) {
        removeEvent(oldElement, name.slice(2).toLowerCase());
      } else {
        oldElement.removeAttribute(name);
      }
    }
  }
}

function updateElement(container, newElement, oldElement) {
  if (!newElement && oldElement) {
    container.removeChild(oldElement);
    return;
  }
  if (newElement && !oldElement) {
    container.appendChild(newElement);
    return;
  }

  if (newElement instanceof Text && oldElement instanceof Text) {
    if (newElement.textContent !== oldElement.textContent) {
      oldElement.textContent = newElement.textContent;
    }
    return;
  }

  if (newElement.nodeName !== oldElement.nodeName) {
    container.replaceChild(newElement, oldElement);
    return;
  }

  updateAttributes(newElement, oldElement);

  const newChildren = [...newElement.childNodes];
  const oldChildren = [...oldElement.childNodes];
  const maxLength = Math.max(newChildren.length, oldChildren.length);
  for (let i = 0; i < maxLength; i++) {
    updateElement(oldElement, newChildren[i], oldChildren[i]);
  }
}

export function renderElement(vNode, container) {
  const oldEl = container.firstChild;
  const newEl = createElement__v2(vNode);

  if (!oldEl) {
    container.appendChild(newEl);
  } else {
    updateElement(container, newEl, oldEl);
  }
  setupEventListeners(container);
}
