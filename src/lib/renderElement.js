// renderElement.js
import { addEvent, removeEvent, setupEventListeners } from './eventManager';
import { createElement__v2 } from './createElement__v2.js';

// TODO: processVNode 함수 구현
function processVNode(vNode) {
  // vNode를 처리하여 렌더링 가능한 형태로 변환합니다.
  // - null, undefined, boolean 값 처리
  // - 문자열과 숫자를 문자열로 변환
  // - 함수형 컴포넌트 처리 <---- 이게 제일 중요합니다.
  // - 자식 요소들에 대해 재귀적으로 processVNode 호출

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return vNode + '';
  }

  if (Array.isArray(vNode)) {
    return vNode.map((child) => processVNode(child));
  }

  if (!vNode || !vNode.type || typeof vNode.type === 'boolean') return '';

  if (typeof vNode.type === 'function') {
    return processVNode(vNode.type(vNode.props));
  }

  const newChildren = vNode.children.map((child) => processVNode(child));

  vNode.children = newChildren;

  return vNode;
}

// TODO: updateAttributes 함수 구현
export function updateAttributes(element, oldProps, newProps) {
  // DOM 요소의 속성을 업데이트합니다.
  // - 이전 props에서 제거된 속성 처리
  // - 새로운 props의 속성 추가 또는 업데이트
  // - 이벤트 리스너, className, style 등 특별한 경우 처리

  //   <이벤트 리스너 처리>
  //     - TODO: 'on'으로 시작하는 속성을 이벤트 리스너로 처리
  //     - 주의: 직접 addEventListener를 사용하지 않고, eventManager의 addEvent와 removeEvent 함수를 사용하세요.
  //     - 이는 이벤트 위임을 통해 효율적으로 이벤트를 관리하기 위함입니다.

  // 이전 속성 제거
  for (const [key, value] of Object.entries(oldProps)) {
    if (!(key in newProps)) {
      if (key.startsWith('on') && typeof value === 'function') {
        const eventType = key.toLowerCase().slice(2);
        removeEvent(element, eventType, value);
      } else {
        element.removeAttribute(key);
      }
    }
  }

  // 새 속성 설정 또는 업데이트
  for (const [key, value] of Object.entries(newProps)) {
    if (oldProps[key] !== value) {
      if (key.startsWith('on') && typeof value === 'function') {
        const eventType = key.toLowerCase().slice(2);
        if (oldProps[key]) {
          removeEvent(element, eventType, oldProps[key]);
        }
        addEvent(element, eventType, value);
      } else if (key === 'className') {
        element.className = value;
      } else if (key === 'style' && typeof value === 'object') {
        Object.assign(element.style, value);
      } else {
        element.setAttribute(key, value);
      }
    }
  }
}

// TODO: updateElement 함수 구현
function updateElement(parentElement, oldNode, newNode, index = 0) {
  // 1. 노드 제거 (newNode가 없고 oldNode가 있는 경우)
  // TODO: oldNode만 존재하는 경우, 해당 노드를 DOM에서 제거
  // 2. 새 노드 추가 (newNode가 있고 oldNode가 없는 경우)
  // TODO: newNode만 존재하는 경우, 새 노드를 생성하여 DOM에 추가
  // 3. 텍스트 노드 업데이트
  // TODO: newNode와 oldNode가 둘 다 문자열 또는 숫자인 경우
  // TODO: 내용이 다르면 텍스트 노드 업데이트
  // 4. 노드 교체 (newNode와 oldNode의 타입이 다른 경우)
  // TODO: 타입이 다른 경우, 이전 노드를 제거하고 새 노드로 교체
  // 5. 같은 타입의 노드 업데이트
  // 5-1. 속성 업데이트
  // TODO: updateAttributes 함수를 호출하여 속성 업데이트
  // 5-2. 자식 노드 재귀적 업데이트
  // TODO: newNode와 oldNode의 자식 노드들을 비교하며 재귀적으로 updateElement 호출
  // HINT: 최대 자식 수를 기준으로 루프를 돌며 업데이트
  // 5-3. 불필요한 자식 노드 제거
  // TODO: oldNode의 자식 수가 더 많은 경우, 남은 자식 노드들을 제거

  // 1번
  if (!newNode && oldNode) {
    parentElement.removeChild(parentElement.childNodes[index]);
    return;
  }

  // 2번
  if (newNode && !oldNode) {
    parentElement.appendChild(createElement__v2(newNode));
    return;
  }

  // 3번
  if (typeof newNode === 'string' || typeof newNode === 'number') {
    if (oldNode !== newNode) {
      parentElement.replaceChild(document.createTextNode(newNode), parentElement.childNodes[index]);
    }
    return;
  }

  // 함수형 컴포넌트 처리
  if (typeof newNode.type === 'function') {
    updateElement(parentElement, oldNode, processVNode(newNode), index);
    return;
  }

  // 4번
  if (oldNode.type !== newNode.type) {
    parentElement.replaceChild(createElement__v2(newNode), parentElement.childNodes[index]);
    return;
  }

  // 5-1.
  updateAttributes(parentElement.childNodes[index], oldNode.props || {}, newNode.props || {});

  // 5-2.
  const maxLength = Math.max(oldNode.children.length, newNode.children.length);
  for (let i = 0; i < maxLength; i++) {
    updateElement(parentElement.childNodes[index], oldNode.children[i], newNode.children[i], i);
  }

  // 5-3.
  for (let i = maxLength; i < oldNode.children.length; i++) {
    parentElement.removeChild(parentElement.childNodes[index + i]);
  }
}

// TODO: renderElement 함수 구현
export function renderElement(vNode, container) {
  // 최상위 수준의 렌더링 함수입니다.
  // - 이전 vNode와 새로운 vNode를 비교하여 업데이트
  // - 최초 렌더링과 업데이트 렌더링 처리
  // 이벤트 위임 설정
  // TODO: 렌더링이 완료된 후 setupEventListeners 함수를 호출하세요.
  // 이는 루트 컨테이너에 이벤트 위임을 설정하여 모든 하위 요소의 이벤트를 효율적으로 관리합니다.

  const rootNode = typeof container === 'string' ? document.getElementById(container) : container;

  if (!rootNode) {
    throw new Error('Root element not found');
  }

  const oldNode = rootNode._vNode;
  const newNode = processVNode(vNode);

  if (!oldNode) {
    rootNode.appendChild(createElement__v2(newNode));
  } else {
    updateElement(rootNode, oldNode, newNode);
  }

  rootNode._vNode = newNode;
  setupEventListeners(rootNode);

  return rootNode;
}
