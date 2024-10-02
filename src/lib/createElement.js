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
  // 2번 요구사항
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(vNode);
  }
  // 1번 요구사항
  if (!vNode || typeof vNode === 'boolean') {
    return document.createTextNode('');
  }
  // 3번 요구사항
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();

    vNode.forEach((item) => {
      const element = createElement(item);
      fragment.appendChild(element);
    });
    return fragment;
  }
  // 4번 요구사항
  if (typeof vNode.type === 'function') {
    const node = vNode.type(vNode.props);
    const element = createElement(node);
    return element;
  }
  // 5번 요구사항
  const element = document.createElement(vNode.type);
  if (vNode.props) {
    // props이 있는경우
    Object.keys(vNode.props).forEach((key) => {
      if (key.startsWith('on')) {
        element.addEventListener(key.slice(2).toLowerCase(), vNode.props[key]);
        return;
      }
      if (key.startsWith('className')) {
        element.className = vNode.props[key];
        return;
      }
      element.setAttribute(key, vNode.props[key]);
    });
  }
  if (Array.isArray(vNode.children)) {
    vNode.children.forEach((item) => {
      const childElement = createElement(item);
      element.appendChild(childElement);
    });
  }
  return element;
}
