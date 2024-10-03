// renderElement.js
import { addEvent, removeEvent, setupEventListeners } from './eventManager';
import { createElement__v2 } from './createElement__v2.js';
import { isArray, isEventKey } from '../utils/misc.js';

function processVNode(vNode) {
  if (!vNode) {
    return null;
  }

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return `${vNode}`;
  }

  if (isArray(vNode)) {
    return vNode.map((child) => processVNode(child));
  }

  if (typeof vNode.type === 'function') {
    if (vNode.type.name === 'Fragment') {
      const children = processVNode(vNode.type({ children: vNode.children } || {}));
      return { type: 'Fragment', props: vNode.props, children };
    }
    return processVNode(vNode.type(vNode.props || {}));
  }

  vNode.children = vNode.children?.map((child) => processVNode(child));

  return vNode;
}

function updateAttributes(oldProps = {}, newProps = {}, domElement) {
  Object.keys(oldProps).forEach((key) => {
    if (!(key in newProps)) {
      if (isEventKey(key)) {
        const eventType = key.slice(2).toLowerCase();
        removeEvent(domElement, eventType, oldProps[key]);
      } else if (key === 'className') {
        domElement.removeAttribute('class');
      } else {
        domElement.removeAttribute(key);
      }
    }
  });

  Object.entries(newProps).forEach(([key, value]) => {
    if (newProps[key] !== oldProps[key]) {
      if (isEventKey(key)) {
        const eventType = key.slice(2).toLowerCase();
        addEvent(domElement, eventType, value);
      } else if (key === 'className') {
        domElement.setAttribute('class', value);
      } else {
        domElement.setAttribute(key, value);
      }
    }
  });
}

function updateElement(oldNode, newNode, parent, index = 0) {
  const replacedNode = parent.childNodes[index];

  // 1. 노드 제거 (newNode가 없고 oldNode가 있는 경우)
  if (oldNode && !newNode) {
    replacedNode.remove();
    return;
  }
  // 2. 새 노드 추가 (newNode가 있고 oldNode가 없는 경우)
  if (!oldNode && newNode) {
    parent.appendChild(createElement__v2(newNode));
    return;
  }
  // 3. 텍스트 노드 업데이트
  if (isTextNodes(oldNode, newNode)) {
    if (oldNode === newNode) return;
    parent.replaceChild(createElement__v2(newNode), parent.childNodes[index]);
    return;
  }

  // 4. 노드 교체 (newNode와 oldNode의 타입이 다른 경우)
  if (oldNode.type !== newNode.type) {
    parent.replaceChild(createElement__v2(newNode), parent.childNodes[index]);
    return;
  }
  // 5. 같은 타입의 노드 업데이트

  if (oldNode.type === newNode.type) {
    updateAttributes(oldNode.props || {}, newNode.props || {}, replacedNode);

    if (oldNode.type === 'Fragment') {
      diffChildren(oldNode.children, newNode.children, parent, index);
    } else {
      diffChildren(oldNode.children, newNode.children, parent.childNodes[index]);
    }
  }
}

function diffChildren(oldChildren, newChildren, parent, fragmentIndex = 0) {
  const maxLength = Math.max(oldChildren.length, newChildren.length);
  for (let i = 0; i < maxLength; i++) {
    updateElement(oldChildren[i], newChildren[i], parent, i + fragmentIndex);
  }
}

function isTextNodes(oldNode, newNode) {
  return (
    (typeof oldNode === 'string' && typeof newNode === 'string') ||
    (typeof oldNode === 'string' && typeof newNode === 'number') ||
    (typeof oldNode === 'number' && typeof newNode === 'string') ||
    (typeof oldNode === 'number' && typeof newNode === 'number')
  );
}

export function renderElement(vNode, container) {
  // 최상위 수준의 렌더링 함수입니다.
  // - 이전 vNode와 새로운 vNode를 비교하여 업데이트
  // - 최초 렌더링과 업데이트 렌더링 처리

  if (!container) {
    return;
  }

  const newVNodes = processVNode(vNode);

  if (!container._vDom) {
    container.appendChild(createElement__v2(newVNodes));
  } else {
    const oldVNodes = container._vDom;
    updateElement(oldVNodes, newVNodes, container);
  }

  container._vDom = newVNodes;

  // 이벤트 위임 설정
  setupEventListeners(container);
}
