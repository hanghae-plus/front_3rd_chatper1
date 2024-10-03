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

  // falsy vNode 처리 -> null undefined false true 면 빈 텍스트 노드를 반환
  if (vNode == null || typeof vNode === 'boolean') {
    return document.createTextNode('');
  }

  // 문자열 또는 숫자 vNode 처리
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(vNode.toString());
  }

  // 배열 vNode 처리 (DocumentFragment 사용)
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => fragment.appendChild(createElement__v2(child)));
    return fragment;
  }

  const { type = '', props = {}, children = [] } = vNode;

  // vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출
  if (typeof type === 'function') {
    return createElement__v2(type(props));
  }

  // 일반 요소 vNode 처리
  const $element = document.createElement(type);

  // vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
  props &&
    Object.entries(props).forEach(([key, value]) => {
      if (key.startsWith('on') && typeof value === 'function') {
        const eventType = key.toLowerCase().substring(2);
        addEvent($element, eventType, value);
      } else if (key === 'className') {
        $element.setAttribute('class', value);
      } else if (key !== 'children') {
        $element.setAttribute(key, value);
      }
    });

  // 자식 요소 추가
  children &&
    children.forEach((child) => {
      $element.appendChild(createElement__v2(child));
    });

  return $element;
}
