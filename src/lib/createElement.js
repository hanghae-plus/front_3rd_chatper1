// TODO: createElement 함수 구현
// 1. vNode가 falsy면 빈 텍스트 노드를 반환합니다.
// 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
// 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
// 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
// 5. 위 경우가 아니면 실제 DOM 요소를 생성합니다:
//    - vNode.type에 해당하는 요소를 생성
//    - vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
//    - vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가

export function createElement(vNode) {
  // 1번
  if (!vNode) return document.createTextNode('');

  // 2번
  if (typeof vNode === 'string' || typeof vNode === 'number') return document.createTextNode(vNode);

  // 3번
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((node) => fragment.appendChild(createElement(node)));
    return fragment;
  }

  // 4번
  if (typeof vNode.type === 'function') {
    return createElement(vNode.type(vNode.props));
  }

  // + @ - router에 함수 실행이 아닌, 컴포넌트 자체를 넣어줄 때 실행되는 코드.
  if (typeof vNode.type === 'object' && typeof vNode.type.type === 'function') {
    return createElement(vNode.type);
  }

  // 5번
  const node = document.createElement(vNode.type);

  for (const key in vNode.props) {
    if (key === 'className') {
      node.setAttribute('class', vNode.props['className']);
    } else if (key.startsWith('on') && typeof vNode.props[key] === 'function') {
      const eventType = key.replace('on', '').toLowerCase();
      node.addEventListener(eventType, vNode.props[key]);
    } else node.setAttribute(key, vNode.props[key]);
  }

  if (vNode.children.length > 0) {
    vNode.children.forEach((child) => node.appendChild(createElement(child)));
  }

  return node;
}
