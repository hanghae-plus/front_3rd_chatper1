import { isEmptyObject, isArray, isEventKey } from '../utils';
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

  // vNode가 falsy면 빈 텍스트 노드를 반환합니다.
  if (!vNode || isEmptyObject(vNode)) {
    return document.createTextNode('');
  }

  // vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(`${vNode}`);
  }

  // vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
  if (isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => {
      fragment.appendChild(createElement__v2(child));
    });
    return fragment;
  }

  if (vNode.type === 'Fragment') {
    return createElement__v2(vNode.children);
  }

  if (typeof vNode.type === 'function') {
    if (vNode.type.name === 'Fragment') {
      createElement__v2(vNode.type({ children: vNode.children } || {}));
    }
    return createElement__v2(vNode.type(vNode.props || {}));
  }

  // 실제 DOM 요소를 생성
  // vNode.type에 해당하는 요소를 생성
  const element = document.createElement(vNode.type);

  // vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
  Object.entries(vNode.props || {}).forEach(([name, value]) => {
    if (name === 'className') {
      element.setAttribute('class', value);
    } else if (isEventKey(name) && typeof value === 'function') {
      // 이벤트 리스너 추가
      const eventType = name.slice(2).toLowerCase();

      addEvent(element, eventType, value);
    } else {
      element.setAttribute(name, value);
    }
  });

  // vNode.children의 각 자식에 대해 createElement__v2를 재귀 호출하여 추가
  vNode.children?.forEach((child) => element.appendChild(createElement__v2(child)));

  return element;
}
