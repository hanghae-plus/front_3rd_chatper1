import {
  CLASSNAME_ATTRIBUTE_PREFIX,
  EVENT_LISTENER_ATTRIBUTE_PREFIX,
} from '../constants';
import { addEvent } from './eventManager';

export function createElement__v2(vNode) {
  // 이 함수는 createElement의 개선된 버전입니다.
  // 1. falsy vNode 처리
  // 2. 문자열 또는 숫자 vNode 처리
  // 3. 배열 vNode 처리 (DocumentFragment 사용)

  if (!vNode) {
    return document.createTextNode('');
  }

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(String(vNode));
  }

  const { type: vNodeType, props, children } = vNode;

  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((node) => fragment.appendChild(createElement__v2(node)));

    return fragment;
  }

  if (typeof vNodeType === 'function') {
    const component = vNodeType;
    return createElement__v2(component(props || {}));
  }

  const element = document.createElement(vNodeType);

  props &&
    Object.entries(props).forEach(([name, value]) => {
      const isClassNameAttribute = CLASSNAME_ATTRIBUTE_PREFIX.test(name);
      const isEventAttribute = EVENT_LISTENER_ATTRIBUTE_PREFIX.test(name);

      if (isEventAttribute && typeof value === 'function') {
        const eventName = name
          .match(EVENT_LISTENER_ATTRIBUTE_PREFIX)[1]
          .toLowerCase();
        addEvent(element, eventName, value);
        return;
      }

      if (isClassNameAttribute) {
        element.className = value;
        element.setAttribute('class', value);
        return;
      }

      element.setAttribute(name, value);
    });

  children.forEach(
    (node) => node && element.appendChild(createElement__v2(node))
  );

  return element;
}
