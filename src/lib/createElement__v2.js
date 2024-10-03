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

  // if (typeof vNode.type === 'function') {
  //   return createElement__v2(vNode.type(vNode.props));
  // }

  // +@
  if (typeof vNode.type === 'object' && typeof vNode.type?.type === 'function') {
    return createElement__v2(vNode.type);
  }

  // 4번
  const node = document.createElement__v2(vNode.type);

  Object.entries(vNode.props).forEach(([key, value]) => {
    if (key === 'className') {
      node.setAttribute('class', value);
    } else if (key.startsWith('on') && typeof value === 'function') {
      const eventType = key.replace('on', '').toLowerCase();
      node.addEventListener(eventType, value);
    } else node.setAttribute(key, value);
  });

  if (vNode.children.length > 0) {
    vNode.children.forEach((child) => node.appendChild(createElement__v2(child)));
  }

  return node;
}
