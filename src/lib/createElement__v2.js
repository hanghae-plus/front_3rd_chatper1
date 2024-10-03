import { updateAttributes } from '.';

export function createElement__v2(vNode) {
  // 이 함수는 createElement의 개선된 버전입니다.
  // 1. falsy vNode 처리
  // 2. 문자열 또는 숫자 vNode 처리
  // 3. 배열 vNode 처리 (DocumentFragment 사용)
  // 4. 일반 요소 vNode 처리:
  //    - 요소 생성
  //    - 속성 설정 (이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선)
  //    - 자식 요소 추가

  // 2번
  if (typeof vNode === 'string' || typeof vNode === 'number') return document.createTextNode(vNode);

  // 1번
  if (!vNode) return document.createTextNode('');

  // 3번
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((node) => fragment.appendChild(createElement__v2(node)));
    return fragment;
  }

  // 함수 타입
  if (typeof vNode.type === 'function') {
    return createElement__v2(vNode.type(vNode.props));
  }

  // +@
  if (typeof vNode.type === 'object' && typeof vNode.type?.type === 'function') {
    return createElement__v2(vNode.type);
  }

  // 4번
  const node = document.createElement(vNode.type);
  updateAttributes(node, {}, vNode.props || {});

  vNode.children.forEach((child) => node.appendChild(createElement__v2(child)));

  return node;
}
