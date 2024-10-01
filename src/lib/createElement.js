// TODO: createElement 함수 구현
// 1. vNode가 falsy면 빈 텍스트 노드를 반환합니다.
// 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
// 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
// DocumentFragment : 메인 DOM 트리에 포함되지 않는 가상 메모리 DOM에 존재하는 노드 객체
// 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
// 5. 위 경우가 아니면 실제 DOM 요소를 생성합니다:
//    - vNode.type에 해당하는 요소를 생성
//    - vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
//    - vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가

// 오답노트
// typeof vNode 로 분기처리 -> typeof null 의 값이 object...
// 배열은 Array.isArray() 로 판단
// 객체를 만들지 말고 document.createDocumentFragment(), document.createElement()로 반환하면 됨
// function은 vNode.type으로 들어옴!

export function createElement(vNode) {
  // 여기에 구현하세요
  // array일때
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => {
      const element = createElement(child);
      fragment.appendChild(element);
    });
    return fragment;
  }
  // object일때
  if (vNode && typeof vNode === "object") {
    // function일 때
    if (typeof vNode.type === "function") {
      return createElement(vNode.type(vNode.props));
    }

    const element = document.createElement(vNode.type);

    // children 처리
    if (Array.isArray(vNode.children)) {
      vNode.children.forEach((child) =>
        element.appendChild(createElement(child))
      );
    } else if (vNode.children) {
      element.appendChild(createElement(children));
    }

    return element;
  }
  // 문자열로 반환해야할때
  if (!vNode || typeof vNode === "string" || typeof vNode === "number") {
    const textContent = vNode ? `${vNode}` : "";
    return document.createTextNode(textContent);
  }
}
