import { createElement__v2 } from './createElement__v2.js';
import { addEvent, removeEvent, setupEventListeners } from './eventManager';
import { flatObject } from './flatObject.js';
import { formatVNodeAttr } from './formatVNodeAttr.js';
import { isPrimitiveDataType } from './isPrimitiveDataType.js';

function processVNode(vNode) {
  if (typeof vNode.type === 'function') return processVNode(vNode.type(vNode.props));
  if (Array.isArray(vNode.children)) {
    vNode.children = vNode.children.map(processVNode);
  }
  return vNode;
}

function updateAttributes(newVNode, oldElement) {
  const newNodeAttributes = flatObject(newVNode.props);
  const oldNodeAttributes = flatObject(oldElement._vNode.props);

  for (const { name, value } of newNodeAttributes) {
    formatVNodeAttr(name, value, {
      eventWorker: (key, value) => {
        addEvent(oldElement, key, value);
      },
      attributeWorker: (key, value) => {
        oldElement.setAttribute(key, value);
      },
    });
  }
  for (const { name, value } of oldNodeAttributes) {
    const incorrectProperty = newNodeAttributes.findIndex((item) => item.name === name) === -1;
    if (incorrectProperty) {
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

function updateElement(container, newVNode, oldVNode, index = 0) {
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

  if (isPrimitiveDataType(newVNode, ['string', 'number']) && isPrimitiveDataType(oldVNode, ['string', 'number'])) {
    if (newVNode !== oldVNode) {
      oldElement.textContent = newVNode;
    }
    return;
  }

  if (newVNode.type !== oldVNode.type) {
    container.replaceChild(newElement, oldElement);
    return;
  }

  updateAttributes(newVNode, oldElement);

  const newChildrenLength = newVNode.children.length;
  const oldChildrenLength = oldVNode.children.length;
  const maxLength = Math.max(newChildrenLength, oldChildrenLength);
  for (let i = 0; i < maxLength; i++) {
    updateElement(oldElement, newVNode.children[i], oldVNode.children[i], i);
  }
}

export function renderElement(vNode, container) {
  const newNode = processVNode(vNode);
  const oldNode = container._vNode;

  if (!oldNode) {
    container.appendChild(createElement__v2(newNode));
  } else {
    updateElement(container, newNode, oldNode);
  }
  container._vNode = newNode;

  setupEventListeners(container);
}
