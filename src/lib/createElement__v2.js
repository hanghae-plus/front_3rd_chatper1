import { addEvent } from './eventManager';

export function createElement__v2(vNode) {
  // 이 함수는 createElement의 개선된 버전입니다.
  // 1. falsy vNode 처리
  // 2. 문자열 또는 숫자 vNode 처리
  // 3. 배열 vNode 처리 (DocumentFragment 사용)
  // 4. 일반 요소 vNode 처리:
  //    - 요소 생성
  //    - 속성 설정 (이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선)
  //    - 자식 요소 추가

  if (!vNode) {
    return document.createTextNode('');
  }

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(vNode);
  }

  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.map(createElement__v2).forEach((child) => fragment.appendChild(child));

    return fragment;
  }

  if (typeof vNode.type === 'function') {
    const result = vNode.type(vNode.props || {});

    return createElement__v2(result);
  }

  const $element = document.createElement(vNode.type);

  if (vNode.props) {
    for (const [key, value] of Object.entries(vNode.props)) {
      if (key === 'className') {
        $element.className = value;
      } else if (key.startsWith('on')) {
        const eventName = key.slice(2).toLowerCase();

        addEvent($element, eventName, value);
      } else {
        $element.setAttribute(key, value);
      }
    }
  }

  if (vNode.children) {
    vNode.children.map(createElement__v2).forEach((child) => $element.appendChild(child));
  }

  return $element;
}
