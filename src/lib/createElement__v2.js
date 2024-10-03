import { addEvent } from './eventManager';
import { processVNode } from './renderElement';

export function createElement__v2(vNode) {
  // 이 함수는 createElement의 개선된 버전입니다.
  // 1. falsy vNode 처리
  if (!vNode) {
    return document.createTextNode('');
  }

  // 2. 문자열 또는 숫자 vNode 처리
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(vNode);
  }

  // 3. 배열 vNode 처리 (DocumentFragment 사용)
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => {
      fragment.appendChild(createElement__v2(child));
    });
    return fragment;
  }

  // 4. 일반 요소 vNode 처리:
  if (!vNode.type) {
    console.error('Invalid vNode:', vNode);
    return document.createTextNode('');
  }

  //    - 요소 생성
  const element = document.createElement(vNode.type);

  element.vProps = vNode.props || {};

  //    - 속성 설정 (이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선)
  for (const [key, value] of Object.entries(vNode.props || {})) {
    if (key.startsWith('on') && typeof value === 'function') {
      const eventType = key.slice(2).toLowerCase();
      addEvent(element, eventType, value);
    } else if (key === 'className') {
      element.className = value;
    } else {
      element.setAttribute(key, value);
    }
  }

  //    - 자식 요소 추가
  (vNode.children || []).forEach((child) => {
    element.appendChild(createElement__v2(child));
  });

  return element;
}
