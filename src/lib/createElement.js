export function createElement(vNode) {
  // 1. vNode가 falsy면 빈 텍스트 노드를 반환합니다.
  if (
    vNode === null ||
    vNode === undefined ||
    vNode === false ||
    vNode === true
  ) {
    return document.createTextNode("");
  }

  // 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }

  // 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
  if (Array.isArray(vNode)) {
    return createFragment(vNode);
  }

  // 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
  if (typeof vNode.type === "function") {
    return createElement(vNode.type(vNode.props));
  }

  // 5. 위 경우가 아니면 실제 DOM 요소를 생성합니다:
  //    - vNode.type에 해당하는 요소를 생성
  const $element = document.createElement(vNode.type);

  //    - vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
  setAttributes($element, vNode.props || {});

  //    - vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가
  addChildren($element, vNode.children);

  return $element;
}

// 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
function createFragment(children) {
  const $fragment = document.createDocumentFragment();
  children.forEach((child) => {
    $fragment.appendChild(createElement(child));
  });
  return $fragment;
}

// 5. vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
function setAttributes($element, props) {
  Object.entries(props).forEach(([key, value]) => {
    if (key.startsWith("on")) {
      const event = key.toLowerCase().substring(2);
      $element.addEventListener(event, value);
    } else if (key === "className") {
      $element.setAttribute("class", value);
    } else {
      $element.setAttribute(key, value);
    }
  });
}

// 5. vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가
function addChildren($element, children) {
  (children || []).forEach((child) => {
    $element.appendChild(createElement(child));
  });
}
