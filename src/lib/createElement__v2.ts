import {
  isVNodeText,
  type VNode,
  type VNodeChild,
  type VNodeProps,
} from './createVNode';
import {
  addEvent,
  extractEventType,
  isEventListenerKey,
  removeEvent,
} from './eventManager';

/** 주어진 HTML 요소에 속성을 설정합니다. */
export function setElementAttributes(
  $element: HTMLElement,
  props: NonNullable<VNodeProps>
) {
  Object.entries(props).forEach(([key, value]) => {
    if (typeof value === 'function' && isEventListenerKey(key)) {
      const eventType = extractEventType(key);
      removeEvent($element, eventType);
      addEvent($element, eventType, value);
    } else if (key === 'className') {
      $element.className = value;
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign($element.style, value);
    } else if (key.startsWith('data-') && typeof value === 'object') {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        $element.setAttribute(`data-${dataKey}`, String(dataValue));
      });
    } else if (typeof value === 'object') {
      $element.setAttribute(key, JSON.stringify(value));
    } else {
      $element.setAttribute(key, value);
    }
  });
}

/** 주어진 HTML 요소에 속성을 삭제합니다. */
export function removeElementAttribute($element: HTMLElement, key: string) {
  if (isEventListenerKey(key)) {
    const eventType = extractEventType(key);
    removeEvent($element, eventType);
  }

  if (!isEventListenerKey(key)) {
    $element.removeAttribute(key);
  }
}

/** 주어진 HTML 요소에 자식 노드를 추가합니다. */
function appendChildren($element: HTMLElement, children: VNodeChild[]) {
  for (const child of children) {
    $element.appendChild(createElement__v2(child));
  }
}

/**
 * 주어진 가상 DOM 노드(vNode)를 실제 DOM 노드로 변환하여 반환합니다.
 *
 * @param {VNode} vNode - 가상 DOM 노드
 * @returns {Node} 변환된 DOM 노드
 */
export function createElement__v2(vNode: VNode | VNode[]): Node {
  if (!vNode || typeof vNode === 'boolean') return document.createTextNode('');

  if (Array.isArray(vNode)) {
    const $fragment = document.createDocumentFragment();
    vNode.forEach((child) => $fragment.appendChild(createElement__v2(child)));
    return $fragment;
  }

  if (isVNodeText(vNode)) {
    return document.createTextNode(String(vNode));
  }

  if (typeof vNode.type === 'function') {
    return createElement__v2(
      vNode.type({ ...vNode.props, children: vNode.children })
    );
  }

  const $element = document.createElement(vNode.type);

  if (vNode.props) {
    setElementAttributes($element, vNode.props);
  }

  if (vNode.children) {
    appendChildren($element, vNode.children);
  }

  return $element;
}
