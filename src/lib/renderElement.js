// renderElement.js
import { addEvent, removeEvent, setupEventListeners } from './eventManager';
import { createElement__v2 } from './createElement__v2.js';

// TODO: processVNode 함수 구현
function processVNode() {
  // vNode를 처리하여 렌더링 가능한 형태로 변환합니다.
  // - null, undefined, boolean 값 처리
  // - 문자열과 숫자를 문자열로 변환
  // - 함수형 컴포넌트 처리 <---- 이게 제일 중요합니다.
  // - 자식 요소들에 대해 재귀적으로 processVNode 호출
}

// TODO: updateAttributes 함수 구현
function updateAttributes(element, oldProps = {}, newProps = {}) {
  // DOM 요소의 속성을 업데이트합니다.
  // - 이전 props에서 제거된 속성 처리
  // - 새로운 props의 속성 추가 또는 업데이트
  // - 이벤트 리스너, className, style 등 특별한 경우 처리
  //   <이벤트 리스너 처리>
  //     - TODO: 'on'으로 시작하는 속성을 이벤트 리스너로 처리
  //     - 주의: 직접 addEventListener를 사용하지 않고, eventManager의 addEvent와 removeEvent 함수를 사용하세요.
  //     - 이는 이벤트 위임을 통해 효율적으로 이벤트를 관리하기 위함입니다.

  console.group('updateAttributes -----------------------------------');
  console.log('element:', element);
  console.log('oldProps:', oldProps);
  console.log('newProps:', newProps);
  console.groupEnd();

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

// TODO: updateElement 함수 구현
function updateElement(container, oldVNode, newVNode) {
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

  console.group('updateElement -----------------------------------');
  console.log('container:', container);
  console.log('oldVNode:', oldVNode);
  console.log('newVNode:', newVNode);
  console.groupEnd();

  const oldElement = container.firstChild;

  if (!newVNode && oldVNode) {
    container.removeChild(oldElement);
    return;
  }

  if (newVNode && !oldVNode) {
    const newElement = createElement__v2(newVNode);
    container.appendChild(newElement);
    return;
  }

  if (typeof newVNode === 'string' || typeof newVNode === 'number') {
    if (newVNode !== oldVNode) {
      const newElement = createElement__v2(newVNode);
      container.replaceChild(newElement, oldElement);
    }
    return;
  }

  if (newVNode.type !== oldVNode.type) {
    const newElement = createElement__v2(newVNode);
    container.replaceChild(newElement, oldElement);
    return;
  }

  updateAttributes(oldElement, oldVNode.props, newVNode.props);

  const oldChildren = oldVNode.children;
  const newChildren = newVNode.children;
  const maxLen = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < maxLen; i++) {
    if (i < newChildren.length) {
      updateElement(oldElement, oldChildren[i], newChildren[i]);
    } else if (i < oldChildren.length) {
      oldElement.removeChild(oldElement.childNodes[i]);
    }
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

  console.group('renderElement -----------------------------------');
  console.log('container:', container);
  console.log('vNode:', vNode);
  console.groupEnd();

  const oldVNode = container._vNode;

  if (!oldVNode) {
    const newElement = createElement__v2(vNode);
    container.appendChild(newElement);
  } else {
    updateElement(container, oldVNode, vNode);
  }

  container._vNode = vNode;

  setupEventListeners(container);
}
