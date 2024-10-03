import {
  addEvent,
  extractEventType,
  isEventListenerKey,
  removeEvent,
  setupEventListeners,
} from './eventManager';
import { createElement__v2 } from './createElement__v2';
import { VNode, VNodeChild, VNodeElement, VNodeProps } from './createVNode';

/**
 * 주어진 가상 DOM 노드(vNode)를 처리하여 렌더링 가능한 형태로 변환합니다.
 *
 * 이 함수는 다음을 수행합니다:
 * - null, undefined, boolean 값을 빈 문자열로 처리
 * - 문자열과 숫자를 문자열로 변환
 * - 함수형 컴포넌트를 호출하고, 그 결과를 재귀적으로 처리
 * - 자식 요소들에 대해 재귀적으로 `processVNode`를 호출하여 처리
 *
 * @param {VNode} vNode - 처리할 가상 DOM 노드
 * @returns {VNodeElement | string} - 렌더링 가능한 형태로 변환된 노드
 */
function processVNode(vNode: VNode): VNodeElement | string {
  if (vNode === null || vNode === undefined || typeof vNode === 'boolean') {
    return '';
  }

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return String(vNode);
  }

  if (!Array.isArray(vNode) && typeof vNode.type === 'function') {
    const componentVNode = vNode.type(vNode.props);
    return processVNode(componentVNode);
  }

  if (Array.isArray(vNode.children)) {
    vNode.children = vNode.children.map(processVNode);
  }

  return vNode;
}

/**
 * DOM 요소의 속성을 업데이트합니다.
 *
 * 이 함수는 다음을 수행합니다:
 * - 이전 속성에서 제거된 속성을 처리합니다.
 * - 새로운 속성에 대한 추가 및 업데이트를 처리합니다.
 * - 이벤트 리스너, className, style 등 특별한 경우를 처리합니다.
 *   - 이벤트 리스너는 'on'으로 시작하는 속성을 확인하여 처리합니다.
 *   - 직접 `addEventListener`를 사용하지 않고, eventManager의 `addEvent` 및 `removeEvent` 함수를 사용합니다.
 *   - 이는 이벤트 위임을 통해 효율적으로 이벤트를 관리하기 위함입니다.
 *
 * @param {HTMLElement} $element - 속성을 업데이트할 DOM 요소
 * @param {VNodeProps} oldProps - 이전 속성 집합
 * @param {VNodeProps} newProps - 새로운 속성 집합
 */
function updateAttributes(
  $element: HTMLElement,
  oldProps: VNodeProps,
  newProps: VNodeProps
) {
  // 이전 속성 제거
  for (const key in oldProps) {
    const isNewProp = newProps && key in newProps;
    if (!isNewProp) {
      removeAttributeOrEvent($element, key, oldProps[key]);
    }
  }

  // 새 속성 추가 또는 업데이트
  for (const key in newProps) {
    const prevValue = oldProps?.[key];
    const nextValue = newProps[key];

    if (nextValue !== prevValue) {
      updateAttributeOrEvent($element, key, prevValue, nextValue);
    }
  }

  /** DOM 요소에서 속성이나 이벤트 리스너 제거 */
  function removeAttributeOrEvent(
    $element: HTMLElement,
    key: string,
    value: any
  ) {
    if (isEventListenerKey(key)) {
      const eventType = extractEventType(key);
      removeEvent($element, eventType, value);
      return;
    }

    if (!isEventListenerKey(key)) {
      $element.removeAttribute(key);
    }
  }

  /** DOM 요소의 속성이나 이벤트 리스너 업데이트 */
  function updateAttributeOrEvent(
    $element: HTMLElement,
    key: string,
    oldValue: any,
    newValue: any
  ) {
    if (isEventListenerKey(key)) {
      const eventType = extractEventType(key);
      removeEvent($element, eventType, oldValue);
      addEvent($element, eventType, newValue);
    } else if (key === 'className') {
      $element.className = newValue;
    } else {
      $element.setAttribute(key, newValue);
    }
  }
}

/**
 * DOM 요소를 업데이트합니다.
 *
 * 이 함수는 다음을 수행합니다:
 * - 새로운 노드가 없고 기존 노드가 있는 경우 기존 노드를 제거합니다.
 * - 새로운 노드가 있고 기존 노드가 없는 경우 새 노드를 추가합니다.
 * - 문자열이나 숫자의 텍스트 노드를 업데이트합니다.
 * - 노드의 타입이 다르면 기존 노드를 새 노드로 교체합니다.
 * - 같은 타입의 노드의 속성과 자식 노드를 업데이트합니다.
 *
 * @param {HTMLElement} $parent - 업데이트할 부모 DOM 요소
 * @param {VNodeElement | string} newNode - 새로 추가할 가상 DOM 노드 또는 텍스트
 * @param {VNodeElement | string} oldNode - 기존 가상 DOM 노드 또는 텍스트
 * @param {number} [index=0] - 업데이트할 위치의 인덱스
 */
function updateElement(
  $parent: HTMLElement,
  newNode: VNodeElement | string,
  oldNode: VNodeElement | string,
  index: number = 0
) {
  const $existingElement = $parent.childNodes[index] as HTMLElement;

  // 1. 노드 제거 (newNode가 없고 oldNode가 있는 경우)
  if (!newNode && oldNode) {
    $parent.removeChild($existingElement);
    return;
  }

  // 2. 새 노드 추가 (newNode가 있고 oldNode가 없는 경우)
  if (newNode && !oldNode) {
    const $newElement = createElement__v2(newNode);
    $parent.appendChild($newElement);
    return;
  }

  // 3. 텍스트 노드 업데이트
  if (isTextNode(newNode) && isTextNode(oldNode)) {
    if (newNode !== oldNode) {
      $existingElement.nodeValue = String(newNode);
    }
    return;
  }

  // 4. 노드 교체 (newNode와 oldNode의 타입이 다른 경우)
  if (shouldReplaceNode(newNode, oldNode)) {
    const $newElement = createElement__v2(newNode);
    $parent.replaceChild($newElement, $existingElement);
    return;
  }

  // 5. 같은 타입의 노드 업데이트
  if (isVNodeElementType(newNode, oldNode)) {
    const prevNode = oldNode as VNodeElement;
    const nextNode = newNode as VNodeElement;

    updateAttributes($existingElement, prevNode.props, nextNode.props);
    updateChildNodes($existingElement, nextNode.children, prevNode.children);
  }

  /** 주어진 노드가 텍스트 노드인지 확인합니다. */
  function isTextNode(node: VNodeElement | string): boolean {
    return typeof node === 'string' || typeof node === 'number';
  }

  /** 두 노드의 타입이 다른 경우 노드를 교체해야 하는지 여부를 확인합니다. */
  function shouldReplaceNode(
    newNode: VNodeElement | string,
    oldNode: VNodeElement | string
  ): boolean {
    return (
      newNode !== null &&
      oldNode !== null &&
      typeof newNode !== 'string' &&
      typeof oldNode !== 'string' &&
      newNode.type !== oldNode.type
    );
  }

  /** 두 노드가 VNodeElement 타입인지 확인합니다. */
  function isVNodeElementType(
    newNode: VNodeElement | string,
    oldNode: VNodeElement | string
  ): boolean {
    return (
      newNode !== null &&
      oldNode !== null &&
      typeof newNode !== 'string' &&
      typeof oldNode !== 'string'
    );
  }

  /** 자식 노드를 업데이트합니다. */
  function updateChildNodes(
    $parent: HTMLElement,
    newChildren: VNodeChild[],
    oldChildren: VNodeChild[]
  ) {
    const maxLength = Math.max(newChildren.length, oldChildren.length);
    for (let i = 0; i < maxLength; i++) {
      updateElement($parent, newChildren[i], oldChildren[i], i);
    }
  }
}

/**
 * 최상위 수준의 렌더링 함수입니다.
 *
 * 이 함수는 다음을 수행합니다:
 * - 주어진 가상 노드(vNode)를 처리하여 렌더링 가능한 형태로 변환합니다.
 * - 이전 vNode와 새로운 vNode를 비교하여 업데이트합니다.
 * - 최초 렌더링 시에는 DOM 요소를 생성하여 추가하고, 리렌더링 시에는 기존 요소를 업데이트합니다.
 *
 * @param {VNode} vNode - 렌더링할 가상 DOM 노드
 * @param {HTMLElement & { _vNode: VNodeElement | string }} container - DOM 요소와 이전 vNode를 저장할 컨테이너
 */
export function renderElement(
  vNode: VNode,
  container: HTMLElement & { _vNode: VNodeElement | string }
) {
  const oldVNode = container._vNode || null;
  const newVNode = processVNode(vNode);

  // 최초 렌더링: 기존 vNode가 없으면 새로운 DOM 요소를 생성하여 추가합니다.
  if (oldVNode === null) {
    container.appendChild(createElement__v2(newVNode));
  } else {
    // 리렌더링: 기존 vNode와 새로운 vNode를 비교하여 업데이트합니다.
    updateElement(container, newVNode, oldVNode);
  }

  container._vNode = newVNode;

  // 렌더링이 완료된 후 이벤트 위임 설정
  setupEventListeners(container);
}
