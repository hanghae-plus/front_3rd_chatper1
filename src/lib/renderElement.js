// renderElement.js
import { createElement__v2 } from './createElement__v2';
import { addEvent, removeEvent, setupEventListeners } from './eventManager';

/**
 * @function processVNode
 * @terms vNode를 분석하여 랜더링 가능한 형태로 변환
 * @param {Object} vNode - 가상 노드 객체
 * @returns {Object} 변환된 vNode
 */

function processVNode(vNode) {

  // 1. vNode가 falsy일 경우 빈 텍스트 노드를 반환
  if (!vNode || typeof vNode === 'boolean') {
    return ('');
  }

  // 2. vNode가 문자열이나 숫자일 경우 텍스트 노드를 생성하여 반환
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return String(vNode);
  }

  // 3. vNode의 type이 함수형인 경우, 컴포넌트를 호출하여 결과를 재귀적으로 처리
  if (typeof vNode.type === 'function') {
    const { type: component, props } = vNode;

    return processVNode(component(props));
  }

  // 4. 자식 요소들에 대해 재귀적으로 processVNode 호출하여 변환
  const processedChildren = (vNode.children || []).map((child) =>
    processVNode(child)
  );


  // 5. 렌더링 가능한 형태의 객체로 변환하여 반환
  return {
    type: vNode.type,
    props: vNode.props || {},
    children: processedChildren,
  };
};

/**
 * @function updateAttributes
 * @description DOM 요소의 속성을 업데이트합니다.
 * @param {HTMLElement} oldElement - 기존 요소
 * @param {Object} oldProps - 기존 속성 객체
 * @param {Object} newProps - 새로운 속성 객체
 */

const updateAttributes = (oldElement, oldProps = {}, newProps = {}) => {
  // 3. 새로운 속성을 추가하거나 업데이트
  for (const [key, value] of Object.entries(newProps)) {
    if (key.startsWith('on') && typeof value === 'function') {
      const eventType = key.slice(2).toLowerCase();
      // 2. 기존 노드의 속성 업데이트
      const oldEventHandler = oldProps[key];

      // 기존 요소와 새 요소의 핸들러가 같으면 유지
      if (value === oldEventHandler) {
        continue;
      }

      // 3. 이벤트 위임을 위해 eventManager의 addEvent와 removeEvent를 사용
      oldEventHandler && removeEvent(oldElement, eventType, oldEventHandler);
      value && addEvent(eventType, oldElement, value);
    } else if (key === 'className') {
      oldElement.setAttribute('class', value || '');
    } else if (key === 'style') {
      Object.assign(oldElement.style, value);
    } else {
      oldElement.setAttribute(key, value);
    }
  }

    // 4. 이전 속성 중 새로운 속성에 존재하지 않는 속성을 제거
  for (const [key, value] of Object.entries(oldProps)) {
    if (key in newProps) {
      continue;
    }

    if (key.startsWith('on')) {
      const eventType = key.slice(2).toLowerCase();
      removeEvent(oldElement, eventType, value);
    } else {
      oldElement.removeAttribute(key);
    }
  }
};

/**
 * @function updateElement
 * @description 두 요소를 비교하여 변경된 부분만 업데이트
 * @param {HTMLElement} container - 부모 요소
 * @param {Object} oldNode - 기존 가상 노드
 * @param {Object} newNode - 새로운 가상 노드
 * @param {number} index - 자식 요소의 인덱스
 */

const updateElement = (container, oldNode, newNode, index = 0) => {
  const oldElement = container.childNodes[index];

  // 1. 새로운 노드가 없고 기존 노드가 있는 경우, 기존 노드를 제거
  if (!newNode && oldNode) {
    oldElement && container.removeChild(oldElement);
    return;
  }

  // 2. 새로운 노드가 있고 기존 노드가 없는 경우, 새로운 노드를 추가
  if (newNode && !oldNode) {
    const newElement = createElement__v2(newNode);
    container.appendChild(newElement);
    return;
  }

  // 3. 둘 다 텍스트 노드인 경우, 내용이 다르면 업데이트
  if (
    ['string', 'number'].includes(typeof newNode) &&
    ['string', 'number'].includes(typeof oldNode) &&
    newNode !== oldNode
  ) {
    const newTextElement = document.createTextNode(newNode);
    container.replaceChild(newTextElement, oldElement);
    return;
  }

  // 4. 노드 타입이 다른 경우, 기존 노드를 새로운 노드로 교체
  if (newNode.type !== oldNode?.type) {
    const newElement = createElement__v2(newNode);

    if (oldElement) {
      container.replaceChild(newElement, oldElement);
    } else {
      container.appendChild(newElement); 
    }

    return;
  }

  // 5. 같은 타입의 노드 업데이트
  if (!oldElement) return;

  // 5-1. 같은 타입의 노드일 경우, 속성을 업데이트
  updateAttributes(oldElement, oldNode.props || {}, newNode.props || {});

  // 5-2. 자식 요소 재귀적 업데이트 newNode와 oldNode의 자식 노드들을 비교하며 재귀적으로 updateElement 호출
  const oldChildren = oldNode.children || [];
  const newChildren = newNode.children || [];
  const maxChildrenLength = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < maxChildrenLength; i++) {
    updateElement(oldElement, oldChildren[i], newChildren[i], i);
  }

  // 5-3. 불필요한 자식 노드 제거
  while (oldElement.childNodes.length > newChildren.length) {
    oldElement.removeChild(oldElement.lastChild);
  }
};

/**
 * @function renderElement
 * @description 최상위 수준의 렌더링 함수. 이전 vNode와 새로운 vNode를 비교하여 업데이트
 * @param {Object} vNode - 가상 노드 객체
 * @param {HTMLElement} container - 렌더링할 대상 컨테이너
 */

export function renderElement (vNode, container)  {
  const oldVNode = container?.oldVNode;
  const newVNode = processVNode(vNode);

  // 1. 초기 렌더링 또는 업데이트 렌더링 처리
  if (oldVNode) {
    updateElement(container, oldVNode, newVNode);
  } else {
    container.appendChild(createElement__v2(newVNode));
  }

  // 2. 새로운 가상 노드를 컨테이너에 저장하여 다음 업데이트에 사용
  container.oldVNode = newVNode;

  // 3. 이벤트 위임 설정
  setupEventListeners(container);
};
