export function createElement(vNode) {
  // 1. vNode가 falsy면 빈 텍스트 노드를 반환합니다.
  if (!vNode) {
    return document.createTextNode("");
  }

  // 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }

  // 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => {
      const childNode = createElement(child);
      fragment.appendChild(childNode);
    });
    return fragment;
  }

  // 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
  if (typeof vNode.type === "function") {
    const componentVNode = vNode.type(vNode.props || {}); // 컴포넌트 함수 호출
    return createElement(componentVNode);
  }

  // 5. 위 경우가 아니면 실제 DOM 요소를 생성합니다.
  const domElement = document.createElement(vNode.type);

  if (vNode.props) {
    Object.keys(vNode.props).forEach((propName) => {
      const propValue = vNode.props[propName];

      // 이벤트 리스너, className, 일반 속성 등 처리
      if (propName.startsWith("on") && typeof propValue === "function") {
        const eventName = propName.toLowerCase().slice(2);
        domElement.addEventListener(eventName, propValue);
      } else if (propName === "className") {
        domElement.className = propValue;
      } else if (propName === "value" || propName === "defaultValue") {
        // 입력 필드의 값을 설정
        domElement.value = propValue;
      } else if (propName !== undefined && propName !== null) {
        domElement.setAttribute(propName, propValue);
      }
    });
  }

  // 6. vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가
  if (vNode.children) {
    vNode.children.forEach((child) => {
      const childEle = createElement(child);
      domElement.appendChild(childEle);
    });
  }

  return domElement;
}
