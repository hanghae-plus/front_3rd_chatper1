import {
  isVNodeText,
  type VNode,
  type VNodeChild,
  type VNodeProps,
} from './createVNode';
import { extractEventType, isEventListenerKey } from './eventManager';

/** 주어진 HTML 요소에 속성을 설정합니다. */
function setAttributes($element: HTMLElement, props: NonNullable<VNodeProps>) {
  Object.entries(props).forEach(([key, value]) => {
    if (typeof value === 'function' && isEventListenerKey(key)) {
      const eventType = extractEventType(key);
      $element.addEventListener(eventType, value);
    } else if (key === 'className') {
      $element.className = value;
    } else {
      $element.setAttribute(key, value);
    }
  });
}

/** 주어진 HTML 요소에 자식 노드를 추가합니다. */
function appendChildren($element: HTMLElement, children: VNodeChild[]) {
  for (const child of children) {
    $element.appendChild(createElement(child));
  }
}

/**
 * 주어진 가상 DOM 노드(vNode)를 실제 DOM 노드로 변환하여 반환합니다.
 *
 * @param {VNode} vNode - 가상 DOM 노드
 * @returns {Node} 변환된 DOM 노드
 */
export function createElement(vNode: VNode | VNode[]): Node {
  if (vNode === undefined || vNode === null || typeof vNode === 'boolean') {
    return document.createTextNode('');
  }

  if (Array.isArray(vNode)) {
    const $fragment = document.createDocumentFragment();
    vNode.forEach((child) => $fragment.appendChild(createElement(child)));
    return $fragment;
  }

  if (isVNodeText(vNode)) {
    return document.createTextNode(String(vNode));
  }

  if (typeof vNode.type === 'function') {
    return createElement(
      vNode.type({ ...vNode.props, children: vNode.children })
    );
  }

  const $element = document.createElement(vNode.type);

  if (vNode.props) {
    setAttributes($element, vNode.props);
  }

  if (vNode.children) {
    appendChildren($element, vNode.children);
  }

  return $element;
}
