import { createElement__v2 } from './createElement__v2.js';
import { addEvent, removeEvent, setupEventListeners } from './eventManager';

function processVNode(vNode) {
  if (vNode == null || typeof vNode === 'boolean') {
    return '';
  }

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return vNode.toString();
  }

  if (typeof vNode.type === 'function') {
    return processVNode(vNode.type(vNode.props));
  }

  if (Array.isArray(vNode)) {
    return vNode.map(processVNode);
  }

  vNode.children = Array.isArray(vNode.children)
    ? vNode.children.map(processVNode)
    : [processVNode(vNode.children)];

  return vNode;
}

function updateAttributes(element, newProps, oldProps = {}) {
  const mergedProps = { ...oldProps, ...newProps };

  Object.keys(mergedProps).forEach((key) => {
    const oldValue = oldProps[key];
    const newValue = newProps[key];

    if (key === 'className') {
      element.className = newValue || '';
    } else if (key === 'style' && typeof newValue === 'object') {
      Object.assign(element.style, newValue);
    } else if (key.startsWith('on') && typeof newValue === 'function') {
      const eventType = key.toLowerCase().substr(2);
      if (oldValue) removeEvent(element, eventType, oldValue);
      if (newValue) addEvent(element, eventType, newValue);
    } else if (!(key in newProps)) {
      element.removeAttribute(key);
    } else if (newValue === true) {
      element.setAttribute(key, '');
    } else if (newValue === false || newValue == null) {
      element.removeAttribute(key);
    } else {
      element.setAttribute(key, newValue);
    }
  });
}

function updateElement(parentElement, newNode, oldNode, index = 0) {
  if (!oldNode) {
    parentElement.appendChild(createElement__v2(newNode));
  } else if (!newNode) {
    parentElement.removeChild(parentElement.childNodes[index]);
  } else if (newNode.type !== oldNode.type) {
    parentElement.replaceChild(
      createElement__v2(newNode),
      parentElement.childNodes[index]
    );
  } else if (typeof newNode === 'string' && typeof oldNode === 'string') {
    if (newNode !== oldNode) {
      parentElement.childNodes[index].nodeValue = newNode;
    }
  } else {
    const newElement = parentElement.childNodes[index];
    updateAttributes(newElement, newNode.props, oldNode.props);

    const maxLength = Math.max(
      newNode.children.length,
      oldNode.children.length
    );
    for (let i = 0; i < maxLength; i++) {
      updateElement(newElement, newNode.children[i], oldNode.children[i], i);
    }
  }
}

export function renderElement(vNode, container) {
  const processedVNode = processVNode(vNode);

  if (!container._vNode) {
    // 최초 렌더링
    container.innerHTML = '';
    container.appendChild(createElement__v2(processedVNode));
  } else {
    // 리렌더링
    updateElement(container, processedVNode, container._vNode);
  }

  container._vNode = processedVNode;

  // 이벤트 위임 설정
  setupEventListeners(container);
}
