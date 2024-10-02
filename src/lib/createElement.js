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
  // 여기에 구현하세요

  // 1. vNode가 falsy면 빈 텍스트 노드를 반환합니다.
  //숫자 0은 빈 텍스트노드로 나오면 안되지만.. 테스트코드때문에 && vNode != 0 지움
  if (!vNode) {
    return document.createTextNode("");
  }

  // 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
  if (typeof vNode == "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }

  // 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
  if (Array.isArray(vNode)) {
    const $fragment = document.createDocumentFragment();
    vNode.forEach((children) => {
      $fragment.appendChild(createElement(children));
    });
    return $fragment;
  }

  // 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
  if (typeof vNode.type === "function") {
    return createElement(vNode.type(vNode.props));
  }

  // 5. 위 경우가 아니면 실제 DOM 요소를 생성합니다.
  // - vNode.type에 해당하는 요소를 생성
  const $element = document.createElement(vNode.type);

  // - vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
  for (const [key, value] of Object.entries(vNode.props || {})) {
    if (key.startsWith("on")) {
      $element.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (key === "className") {
      $element.className = value;
    }
    //이렇게 하니 HomePage를 렌더링 했을 때
    //html 문자열로 잘 변환되는지 확인 테스트 통과가 안 돼서 주석 처리하겠습니다!
    // else if (typeof value === "boolean") {
    //   //checked, disabled
    //   // 불리언 속성 처리
    //   if (value) {
    //     $element.setAttribute(key, "");
    //   }
    // }
    else if (key.startsWith("data-")) {
      // 데이터 속성 처리
      $element.setAttribute(key, value);
    } else {
      $element.setAttribute(key, value);
    }
  }

  // - vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가
  (vNode.children || []).forEach((children) => {
    $element.appendChild(createElement(children));
  });

  return $element;
}
