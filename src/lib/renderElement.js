import { createElement__v2 } from './createElement__v2.js';
import { addEvent, removeEvent, setupEventListeners } from './eventManager';
import { flatObject } from './flatObject.js';
import { formatVNodeAttr } from './formatVNodeAttr.js';

function updateAttributes(newElement, oldElement) {
  const newNodeAttributes = [...newElement.attributes, ...flatObject(newElement._vNode?.props)];
  const oldNodeAttributes = [...oldElement.attributes, ...flatObject(oldElement._vNode?.props)];

  for (const { name, value } of newNodeAttributes) {
    formatVNodeAttr(name, value, {
      eventWorker: (key, value) => {
        addEvent(oldElement, key, value);
        oldElement._vNode = newElement._vNode;
      },
      attributeWorker: (key, value) => {
        oldElement.setAttribute(key, value);
      },
    });
  }
  for (const { name, value } of oldNodeAttributes) {
    if (!newElement.getAttribute(name) && !newNodeAttributes.map((item) => item.name).includes(name)) {
      formatVNodeAttr(name, value, {
        eventWorker: (key) => {
          removeEvent(oldElement, key);
        },
        attributeWorker: (key) => {
          oldElement.removeAttribute(key);
        },
      });
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
