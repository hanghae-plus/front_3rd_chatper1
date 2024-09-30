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
  // 1. falsy
  if (!vNode) {
    return document.createTextNode(""); // 빈 텍스트 노드 반환
  }

  // 2. 문자열이나 숫자
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode); // vNode 값으로 텍스트 노드 반환
  }

  // 3. 배열
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment(); // DocumentFragment 생성
    vNode.forEach((child) => {
      const childElement = createElement(child); // 각 자식 요소에 대해 재귀 호출
      fragment.appendChild(childElement); // DocumentFragment에 추가
    });
    return fragment; // 완성된 DocumentFragment 반환
  }

  // 4. vNode.type이 함수면
  if (typeof vNode.type === "function") {
    const componentVNode = vNode.type(vNode.props); // 해당 함수를 호출
    return createElement(componentVNode); // 그 결과로 createElement를 재귀 호출
  }
  // 5. 위 경우가 아니면
  const element = document.createElement(vNode.type); // vNode.type에 해당하는 DOM 요소 생성

  // vNode.props의 속성들을 적용
  if (vNode.props) {
    for (const [key, value] of Object.entries(vNode.props)) {
      if (key.startsWith("on")) {
        // 이벤트 리스너 처리 (onClick, onChange 등)
        const eventType = key.slice(2).toLowerCase(); // 'onClick' -> 'click'
        element.addEventListener(eventType, value);
      } else if (key === "className") {
        // className을 class 속성으로 설정
        element.className = value;
      } else {
        // 일반 속성 설정 (예: id, data-* 등)
        element.setAttribute(key, value);
      }
    }
  }

  // vNode.children의 각 자식에 대해 createElement 재귀 호출하여 추가
  if (vNode.children) {
    vNode.children.forEach((child) => {
      const childElement = createElement(child); // 자식 요소에 대해 재귀 호출
      element.appendChild(childElement); // 자식 요소를 DOM에 추가
    });
  }

  return element; // 완성된 DOM 요소 반환
}
