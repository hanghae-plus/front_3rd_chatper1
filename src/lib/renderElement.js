// renderElement.js
import { createElement__v2 } from './createElement__v2';
import { addEvent, removeEvent, setupEventListeners } from './eventManager';

// vNode를 처리하여 렌더링 가능한 형태로 변환합니다.
function processVNode(vNode) {
  // - null, undefined, boolean 값 처리
  // - 함수형 컴포넌트 처리 <---- 이게 제일 중요합니다.
  // - 자식 요소들에 대해 재귀적으로 processVNode 호출

  // null, undefined, boolean 값 처리
  if (!vNode || typeof vNode === 'boolean') {
    return {};
  }

  // 문자열과 숫자를 문자열로 변환
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return String(vNode);
  }

  // 함수형 컴포넌트 처리
  if (typeof vNode.type === 'function') {
    const { type: component, props } = vNode;

    return processVNode(component(props));
  }

  // 자식 요소들에 대해 재귀적으로 processVNode 호출
  const processedChildren = (vNode.children || []).map((child) =>
    processVNode(child)
  );

  // 렌더링 가능한 형태로 변환 (Virtual DOM 형태)
  return {
    type: vNode.type,
    props: vNode.props || {},
    children: processedChildren,
  };
}

function updateAttributes(oldElement, oldProps = {}, newProps = {}) {
  // 새로운 속성 추가 및 업데이트
  for (const [key, value] of Object.entries(newProps)) {
    // 이벤트 리스너 처리
    if (key.startsWith('on') && typeof value === 'function') {
      const eventType = key.slice(2).toLowerCase();
      const oldEventHandler = oldProps[key];

      // 기존 요소와 새 요소의 핸들러가 같으면 유지
      if (value === oldEventHandler) {
        continue;
      }

      // 이벤트 위임을 위해 eventManager의 addEvent와 removeEvent 사용
      oldEventHandler && removeEvent(oldElement, eventType, oldEventHandler);
      value && addEvent(eventType, oldElement, value);
    } else if (key === 'className') {
      // className 처리
      oldElement.setAttribute('class', value || '');
    } else if (key === 'style') {
      // 스타일 처리 (객체)
      Object.assign(oldElement.style, value);
    } else {
      // 일반 속성 처리
      oldElement.setAttribute(key, value);
    }
  }

  // 제거된 속성 처리
  for (const [key, value] of Object.entries(oldProps)) {
    if (key in newProps) {
      continue;
    }

    if (key.startsWith('on') && typeof value === 'function') {
      const eventType = key.slice(2).toLowerCase();
      removeEvent(oldElement, eventType, value);
    } else {
      oldElement.removeAttribute(key);
    }
  }
}

function updateElement(container, oldNode, newNode, index = 0) {
  const oldElement = container.childNodes[index];

  // 1. 노드 제거 (newNode가 없고 oldNode가 있는 경우): oldNode만 존재하는 경우, 해당 노드를 DOM에서 제거
  if (!newNode && oldNode) {
    // Failed to execute 'removeChild' on 'Node': parameter 1 is not of type 'Node'. 에러 방지
    oldElement && container.removeChild(oldElement);
    return;
  }

  // 2. 새 노드 추가 (newNode가 있고 oldNode가 없는 경우): newNode만 존재하는 경우, 새 노드를 생성하여 DOM에 추가
  if (newNode && !oldNode) {
    const newElement = createElement__v2(newNode);
    container.appendChild(newElement);
    return;
  }

  // 3. 텍스트 노드 업데이트: newNode와 oldNode가 둘 다 문자열 또는 숫자인 경우, 내용이 다르면 텍스트 노드 업데이트
  if (
    ['string', 'number'].includes(typeof newNode) &&
    ['string', 'number'].includes(typeof oldNode) &&
    newNode !== oldNode
  ) {
    const newTextElement = document.createTextNode(newNode);
    container.replaceChild(newTextElement, oldElement);
    return;
  }

  // 4. 노드 교체 (newNode와 oldNode의 타입이 다른 경우): 타입이 다른 경우, 이전 노드를 제거하고 새 노드로 교체
  if (newNode.type !== oldNode?.type) {
    const newElement = createElement__v2(newNode);

    if (oldElement) {
      container.replaceChild(newElement, oldElement); // 노드 교체
    } else {
      container.appendChild(newElement); // 새로운 노드 추가
    }

    return;
  }

  // 5. 같은 타입의 노드 업데이트
  // 비교할 기존 요소가 없으면 종료
  if (!oldElement) return;

  // 5-1. 속성 업데이트: updateAttributes 함수를 호출하여 속성 업데이트
  updateAttributes(oldElement, oldNode.props || {}, newNode.props || {});

  // 5-2. 자식 요소 재귀적 업데이트: newNode와 oldNode의 자식 노드들을 비교하며 재귀적으로 updateElement 호출, 최대 자식 수를 기준으로 루프를 돌며 업데이트
  // children은 자식 '요소'(주석과 줄바꿈 등을 제외한 순수한 element)
  const oldChildren = oldNode.children || [];
  const newChildren = newNode.children || [];
  const maxChildrenLength = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < maxChildrenLength; i++) {
    updateElement(oldElement, oldChildren[i], newChildren[i], i);
  }

  // 5-3. 불필요한 자식 노드 제거: 기존 요소의 자식 수가 더 많은 경우, 남은 자식 노드들을 제거
  // childNodes는 주석, 요소, 줄바꿈 등 모든 것을 포함
  while (oldElement.childNodes.length > newChildren.length) {
    oldElement.removeChild(oldElement.lastChild);
  }
}

// 최상위 수준의 렌더링 함수
export function renderElement(vNode, container) {
  // - 이전 vNode와 새로운 vNode를 비교하여 업데이트
  // - 최초 렌더링과 업데이트 렌더링 처리

  const oldVNode = container?.oldVNode;
  const newVNode = processVNode(vNode); // 새 가상 노드 생성

  if (oldVNode) {
    // 기존 노드가 있으면 업데이트 렌더링
    updateElement(container, oldVNode, newVNode);
  } else {
    // 없으면 최초 렌더링
    container.appendChild(createElement__v2(newVNode));
  }

  container.oldVNode = newVNode; // 최신 vNode로 업데이트

  // 이벤트 위임 설정: 루트 컨테이너에 이벤트 위임을 설정하여 모든 하위 요소의 이벤트를 효율적으로 관리
  // 이벤트 위임 설정 (렌더링 완료 후 호출)
  setupEventListeners(container);
}
