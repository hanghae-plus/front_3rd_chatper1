export function createElement(vNode) {
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

    vNode.forEach((vn) => {
      const childElement = createElement(vn);
      fragment.appendChild(childElement);
    });

    return fragment;
  }

  // 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
  if (typeof vNode.type === "function") {
    const childVNode = vNode.type(vNode.props || {});
    return createElement(childVNode);
  }

  // 5-1. vNode.type에 해당하는 요소를 생성
  const element = document.createElement(vNode.type);

  // 5-2. vNode.props의 속성들을 적용
  if (vNode.props) {
    Object.entries(vNode.props).forEach(([key, value]) => {
      if (key.startsWith("on") && typeof value === "function") {
        element.addEventListener(key.slice(2).toLowerCase(), value);
      } else if (key === "className") {
        element.className = value;
      } else if (value !== undefined && value !== null) {
        element.setAttribute(key, value);
      }
    });
  }

  // 5-3. vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가
  if (vNode.children) {
    vNode.children.forEach((child) => {
      const childElement = createElement(child);
      element.appendChild(childElement);
    });
  }

  return element;
}
