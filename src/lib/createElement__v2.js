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

  // 1. vNode가 falsy면 빈 텍스트 노드를 반환합니다.
  if (!vNode) {
    return document.createTextNode('');
  }

  // 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
  if (['string', 'number'].includes(typeof vNode)) {
    return document.createTextNode(String(vNode));
  }

  // 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();

    vNode.forEach((vn) => fragment.appendChild(createElement__2(vn)));

    return fragment;
  }

  // 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
  if (typeof vNode.type === 'function') {
    const { type: component, props } = vNode;

    return createElement__2(component(props));
  }

  // 5-1 vNode.type에 해당하는 요소를 생성
  const element = document.createElement(vNode.type);

  // 5-2 vNode.props의 속성들을 적용 (이벤트 위임, className, 일반 속성 등 처리)
  Object.entries(vNode.props || {}).forEach(([key, value]) => {
    if (key.startsWith('on') && typeof value === 'function') {
      const eventType = key.slice(2).toLowerCase();
      addEvent(eventType, element, value);
    } else if (key === 'className') {
      element.className = value;
    } else {
      element.setAttribute(key, value);
    }
  });

  // 5-3 vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가
  (vNode.children || []).forEach((child) => {
    element.appendChild(createElement__v2(child));
  });

  return element;
}
