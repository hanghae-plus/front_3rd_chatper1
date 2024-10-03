// renderElement.js
import { addEvent, removeEvent, setupEventListeners } from './eventManager';
import { createElement__v2 } from "./createElement__v2.js";

/**
 * 가상 노드를 처리하여 렌더링 가능한 형태로 변환하는 함수입니다.
 * 
 * @param {object|string|number|null} vNode - 처리할 가상 노드
 * @returns {object|string} - 처리된 가상 노드
 * 
 * 이 함수는 다음과 같은 작업을 수행합니다:
 * 1. null, undefined, boolean 값은 빈 문자열로 변환합니다.
 * 2. 문자열과 숫자는 문자열로 변환하여 반환합니다.
 * 3. 함수형 컴포넌트를 재귀적으로 호출하여 처리합니다.
 * 4. 배열로 주어진 자식 요소들을 재귀적으로 처리합니다.
 */
function processVNode(vNode) {
  // 1. falsy 또는 boolean 값 처리
  if (!vNode || typeof vNode === 'boolean') {
    return '';
  };

  // 2. 문자열 또는 숫자를 처리하여 문자열로 변환
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return vNode.toString();
  };

  // 3. 함수형 컴포넌트를 처리 (컴포넌트 실행 후 그 결과를 다시 processVNode 처리)
  if (typeof vNode.type === 'function') {
    return processVNode(vNode.type(vNode.props || {}));
  }

  // 4. 자식 노드를 처리하여 배열로 반환 (빈 배열 포함)
  const children = vNode.children.map(processVNode).filter(Boolean) || [];

  // 처리된 가상 노드 반환
  return { ...vNode, children };
}

/**
 * DOM 요소의 속성을 업데이트하는 함수입니다.
 * 
 * @param {object} oldVNode - 이전 가상 노드
 * @param {object} newVNode - 새로운 가상 노드
 * @param {HTMLElement} element - 실제 DOM 요소
 * 
 * 이 함수는 다음과 같은 작업을 수행합니다:
 * 1. 이전 props에서 제거된 속성을 DOM 요소에서 삭제합니다.
 * 2. 새로운 props를 DOM 요소에 추가하거나 업데이트합니다.
 * 3. 이벤트 리스너는 eventManager를 통해 처리합니다.
 */
function updateAttributes(oldVNode, newVNode, element) {
  const oldProps = oldVNode?.props || {};
  const newProps = newVNode.props || {};

  // 새로운 속성을 추가하거나 업데이트
  for (const [propName, newValue] of Object.entries(newProps)) {
    // null 또는 undefined 값을 무시
    if (newValue == null) continue;

    // 이벤트 리스너 처리
    if (propName.startsWith('on')) {
      const eventType = propName.slice(2).toLowerCase();
      const oldEventHandler = oldProps[propName];

      if (oldEventHandler) {
        removeEvent(element, eventType, oldEventHandler);
      }
      addEvent(element, eventType, newValue);
      continue;
    }

    // className 처리
    if (propName === 'className') {
      element.className = newValue;
      continue;
    }

    // style 속성 처리
    if (propName === 'style' && typeof newValue === 'object') {
      Object.assign(element.style, newValue);
      continue;
    }

    // 그 외 속성 처리
    element.setAttribute(propName, newValue);
  };

  // 제거된 속성 처리
  for (const propName of Object.keys(oldProps)) {
    if (propName in newProps) continue;

    // 이벤트 리스너 제거
    if (propName.startsWith('on')) {
      const eventType = propName.slice(2).toLowerCase();
      removeEvent(element, eventType, oldProps[propName]);
    } else {
      element.removeAttribute(propName); // 일반 속성 제거
    }
  };
}

/**
 * DOM 요소를 업데이트하는 함수입니다.
 * 
 * @param {HTMLElement} parent - 부모 DOM 요소
 * @param {object} oldVNode - 이전 가상 노드
 * @param {object} newVNode - 새로운 가상 노드
 * @param {number} [index=0] - 자식 노드 인덱스
 * 
 * 이 함수는 다음과 같은 작업을 수행합니다:
 * 1. 새로운 노드가 없으면 기존 노드를 제거합니다.
 * 2. 이전 노드가 없으면 새로운 노드를 추가합니다.
 * 3. 타입이 다른 노드를 교체합니다.
 * 4. 텍스트 노드를 업데이트합니다.
 * 5. 동일한 타입의 노드는 속성과 자식을 업데이트합니다:
 *    - 5-1. 속성 업데이트: 기존 DOM 요소와 새로운 가상 노드의 속성 차이를 비교하여 속성을 갱신합니다.
 *    - 5-2. 자식 노드 업데이트: 재귀적으로 자식 노드를 비교하여 변경된 부분을 업데이트합니다.
 *    - 5-3. 불필요한 자식 노드 제거: 새로운 가상 노드에 없는 자식 노드는 실제 DOM에서 제거합니다.
 */
function updateElement(parent, oldVNode, newVNode, index = 0) {
  const oldDomNode = parent.childNodes[index];

  // 1. 새로운 노드가 없으면 기존 노드를 제거
  if (!newVNode && oldVNode) {
    parent.removeChild(oldDomNode);
    return;
  }

  // 2. 이전 노드가 없으면 새로운 노드를 추가
  if (!oldVNode && !oldVNode) {
    parent.appendChild(createElement__v2(newVNode));
    return;
  }

  // 3. 타입이 다른 노드를 교체
  if (typeof oldVNode !== typeof newVNode || oldVNode.type !== newVNode.type) {
    parent.replaceChild(createElement__v2(newVNode), oldDomNode);
    return;
  }

  // 4. 텍스트 노드 업데이트
  if (typeof newVNode === 'string' || typeof newVNode === 'number') {
    if (oldVNode !== newVNode) {
      parent.replaceChild(document.createTextNode(newVNode), oldDomNode);
    }
    return;
  }

  // 5-1. 일반 DOM 요소 업데이트
  updateAttributes(oldVNode, newVNode, oldDomNode);

  // 5-2. 자식 노드 업데이트 (재귀적으로 비교 및 갱신)
  const maxChildrenLength = Math.max(oldVNode?.children?.length || 0, newVNode?.children?.length || 0);
  for (let i = 0; i < maxChildrenLength; i++) {
    updateElement(oldDomNode, oldVNode.children[i], newVNode.children[i], i);
  }

  // 5-3. 불필요한 자식 노드 제거
  while ((oldDomNode?.childNodes?.length || 0) > (newVNode.children.length || 0)) {
    oldDomNode.removeChild(oldDomNode.lastChild);
  }
}

/**
 * 가상 DOM을 실제 DOM에 렌더링하는 함수입니다.
 * 
 * @param {object} vNode - 렌더링할 가상 DOM 노드
 * @param {HTMLElement} container - 렌더링할 DOM 요소
 * 
 * 이 함수는 다음과 같은 작업을 수행합니다:
 * 1. 최초 렌더링 시에는 createElement__v2로 요소를 생성합니다.
 * 2. 리렌더링 시에는 updateElement를 통해 변경된 부분만 업데이트합니다.
 * 3. render가 완료된 후 setupEventListeners를 호출하여 이벤트 위임을 설정합니다.
 */
export function renderElement(vNode, container) {
  const oldVNode = container._vNode;  // 이전 렌더링된 가상 노드
  const newVNode = processVNode(vNode); // 새로운 가상 노드 처리

  if (!oldVNode) {
    container.appendChild(createElement__v2(newVNode)); // 최초 렌더링: DOM에 새로운 노드를 추가
  } else {
    updateElement(container, oldVNode, newVNode); // 리렌더링: 기존 노드와 새로운 노드를 비교하여 업데이트
  }

  container._vNode = newVNode;  // 현재 가상 노드를 저장하여 다음 업데이트 시 비교

  setupEventListeners(container); // 이벤트 위임 설정
}