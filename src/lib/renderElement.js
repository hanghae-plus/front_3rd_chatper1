// renderElement.js
import { EVENT_LISTENER_ATTRIBUTE_PREFIX } from '../constants/index.js';
import { createElement__v2 } from './createElement__v2.js';
import { addEvent, removeEvent, setupEventListeners } from './eventManager.js';

function processVNode(vNode) {
  if (!vNode || typeof vNode === 'boolean') {
    return '';
  }

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return String(vNode);
  }

  if (typeof vNode.type === 'function') {
    const component = vNode.type(vNode.props);
    return processVNode(component);
  }

  return { ...vNode, children: vNode.children.map(processVNode) };
}

function updateAttributes(element, newNode, oldNode) {
  const newProps = newNode.props || {};
  const oldProps = oldNode.props || {};

  for (const [name, value] of Object.entries(oldProps)) {
    if (newProps[name] !== undefined) {
      continue;
    }

    const isEventAttribute =
      EVENT_LISTENER_ATTRIBUTE_PREFIX.test(name) && typeof value === 'function';
    if (isEventAttribute) {
      const eventType = name
        .match(EVENT_LISTENER_ATTRIBUTE_PREFIX)[1]
        .toLowerCase();
      removeEvent(element, eventType, value);
      continue;
    }

    element.removeAttribute(name);
  }

  for (const [name, value] of Object.entries(newProps)) {
    const isEventAttribute =
      EVENT_LISTENER_ATTRIBUTE_PREFIX.test(name) && typeof value === 'function';
    if (isEventAttribute) {
      const eventType = name
        .match(EVENT_LISTENER_ATTRIBUTE_PREFIX)[1]
        .toLowerCase();

      if (value === oldProps[name]) {
        continue;
      }

      oldProps[name] && removeEvent(element, eventType, oldProps[name]);
      value && addEvent(element, eventType, value);
      continue;
    }

    if (name === 'className') {
      element.setAttribute('class', value || '');
      continue;
    }

    if (name === 'style') {
      Object.assign(element.style, value);
      continue;
    }

    element.setAttribute(name, value);
  }
}

function updateElement(parent, newNode, oldNode, index = 0) {
  const oldElement = parent.childNodes[index];
  const newElement = createElement__v2(newNode);

  // 1. 노드 제거 (newNode가 없고 oldNode가 있는 경우)
  if (!newNode && oldNode) {
    return parent.removeChild(oldElement);
  }

  // 2. 새 노드 추가 (newNode가 있고 oldNode가 없는 경우)
  if (newNode && !oldNode) {
    return parent.appendChild(newElement);
  }

  // 3. 텍스트 노드 업데이트
  if (typeof newNode === 'string' && typeof oldNode === 'string') {
    if (newNode === oldNode) return;

    oldElement.textContent = newNode;
    return;
  }

  // 4. 노드 교체 (newNode와 oldNode의 타입이 다른 경우)
  if (newNode.type !== oldNode.type) {
    return parent.replaceChild(newElement, oldElement);
  }

  // 5. 같은 타입의 노드 업데이트
  // 5-1. 속성 업데이트
  updateAttributes(oldElement, newNode, oldNode);

  // 5-2. 자식 노드 재귀적 업데이트
  const newChildren = newNode.children || [];
  const oldChildren = oldNode.children || [];
  const maxLength = Math.max(newChildren.length, oldChildren.length);

  for (let i = 0; i < maxLength; i++) {
    updateElement(oldElement, newChildren[i], oldChildren[i], i);
  }

  // 5-3. 불필요한 자식 노드 제거
  while (oldElement.childNodes.length > newChildren.length) {
    oldElement.removeChild(oldElement.lastChild);
  }
}

export function renderElement(vNode, container) {
  const newNode = processVNode(vNode);
  const oldNode = container._oldNode;

  if (!oldNode) {
    container.appendChild(createElement__v2(newNode));
  } else {
    updateElement(container, newNode, oldNode);
  }

  container._oldNode = newNode;

  // 이벤트 위임 설정
  setupEventListeners(container);
}
