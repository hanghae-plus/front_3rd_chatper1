// renderElement.js
import { addEvent, removeEvent, setupEventListeners } from './eventManager';
import { createElement } from './createElement.js';
import { flatObject } from './flatObject.js';
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
function updateAttributes(newNode, oldNode) {
  // DOM 요소의 속성을 업데이트합니다.
  // - 이전 props에서 제거된 속성 처리
  // - 새로운 props의 속성 추가 또는 업데이트
  // - 이벤트 리스너, className, style 등 특별한 경우 처리
  //   <이벤트 리스너 처리>
  //     - TODO: 'on'으로 시작하는 속성을 이벤트 리스너로 처리
  //     - 주의: 직접 addEventListener를 사용하지 않고, eventManager의 addEvent와 removeEvent 함수를 사용하세요.
  //     - 이는 이벤트 위임을 통해 효율적으로 이벤트를 관리하기 위함입니다.

  const newNodeAttributes = [...newNode.attributes, ...flatObject(newNode._vNode?.props)];
  const oldNodeAttributes = [...oldNode.attributes, ...flatObject(oldNode._vNode?.props)];

  // console.log(newNodeAttributes);
  // console.log(oldNodeAttributes);

  for (const { name, value } of newNodeAttributes) {
    if (name.startsWith('on')) {
      addEvent(oldNode, name.slice(2).toLowerCase(), value);
      oldNode._vNode = newNode._vNode;
    } else {
      oldNode.setAttribute(name, value);
    }
  }
  for (const { name } of oldNodeAttributes) {
    if (!newNode.getAttribute(name) && !newNodeAttributes.map((item) => item.name).includes(name)) {
      if (name.startsWith('on')) {
        removeEvent(oldNode, name.slice(2).toLowerCase());
      } else {
        oldNode.removeAttribute(name);
      }
    }
  }
}

// TODO: updateElement 함수 구현
function updateElement(container, newNode, oldNode) {
  // 1. 노드 제거 (newNode가 없고 oldNode가 있는 경우)
  // TODO: oldNode만 존재하는 경우, 해당 노드를 DOM에서 제거
  if (!newNode && oldNode) {
    container.removeChild(oldNode);
    return;
  }
  // 2. 새 노드 추가 (newNode가 있고 oldNode가 없는 경우)
  // TODO: newNode만 존재하는 경우, 새 노드를 생성하여 DOM에 추가
  if (newNode && !oldNode) {
    container.appendChild(newNode);
    return;
  }

  // 3. 텍스트 노드 업데이트
  // TODO: newNode와 oldNode가 둘 다 문자열 또는 숫자인 경우
  // TODO: 내용이 다르면 텍스트 노드 업데이트

  if (newNode instanceof Text && oldNode instanceof Text) {
    if (newNode.textContent !== oldNode.textContent) {
      oldNode.textContent = newNode.textContent;
    }
    return;
  }

  // 4. 노드 교체 (newNode와 oldNode의 타입이 다른 경우)
  // TODO: 타입이 다른 경우, 이전 노드를 제거하고 새 노드로 교체
  if (newNode.nodeName !== oldNode.nodeName) {
    container.replaceChild(newNode, oldNode);
    return;
  }
  // 5. 같은 타입의 노드 업데이트
  // 5-1. 속성 업데이트
  // TODO: updateAttributes 함수를 호출하여 속성 업데이트
  updateAttributes(newNode, oldNode);

  // 5-2. 자식 노드 재귀적 업데이트
  // TODO: newNode와 oldNode의 자식 노드들을 비교하며 재귀적으로 updateElement 호출
  // HINT: 최대 자식 수를 기준으로 루프를 돌며 업데이트
  // 5-3. 불필요한 자식 노드 제거
  // TODO: oldNode의 자식 수가 더 많은 경우, 남은 자식 노드들을 제거
  const newChildren = [...newNode.childNodes];
  const oldChildren = [...oldNode.childNodes];
  const maxLength = Math.max(newChildren.length, oldChildren.length);
  for (let i = 0; i < maxLength; i++) {
    updateElement(oldNode, newChildren[i], oldChildren[i]);
  }
}

// TODO: renderElement 함수 구현
export function renderElement(vNode, container) {
  // 최상위 수준의 렌더링 함수입니다.
  // - processVNode를 실행해서 함수 컴포넌트로 정의된 vNode를 전부 해체
  // - 이전 vNode와 새로운 vNode를 비교하여 업데이트
  // - 최초 렌더링 시에는 createElement__v2로 실행
  // - 리렌더링일 때에는 updateElement로 실행
  processVNode();

  const oldEl = container.firstChild;
  const newEl = createElement(vNode);

  if (!oldEl) {
    container.appendChild(newEl);
  } else {
    updateElement(container, newEl, oldEl);
  }

  // 이벤트 위임 설정
  // TODO: 렌더링이 완료된 후 setupEventListeners 함수를 호출하세요.
  // 이는 루트 컨테이너에 이벤트 위임을 설정하여 모든 하위 요소의 이벤트를 효율적으로 관리합니다.
  setupEventListeners(container);
}
