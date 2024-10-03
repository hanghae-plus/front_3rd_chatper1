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
  if (vNode === null || vNode === undefined || typeof vNode === "boolean") {
    return document.createTextNode("");
  }
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((oneNode) => {
      fragment.appendChild(createElement(oneNode));
    });
    return fragment;
  }
  if (typeof vNode.type === "function") {
    const node = vNode.type({ ...vNode.props, children: vNode.children });
    return createElement(node);
  }
  const $el = document.createElement(vNode.type);
  if (vNode.props !== null) {
    for (const key in vNode.props) {
      if (key === "className") {
        $el.setAttribute("class", vNode.props[key]);
      } else if (isEventName(key)) {
        $el.addEventListener(convertToEventName(key), vNode.props[key]);
      } else {
        $el.setAttribute(key, vNode.props[key]);
      }
    }
  }
  if (vNode.children?.length > 0) {
    vNode.children.forEach((child) => {
      $el.appendChild(createElement(child));
    });
  }

  return $el;
}

const ALL_EVENTS = ["click", "input", "change", "submit"];

function isUpperCase(char) {
  if (!char) return false;
  return char === char.toUpperCase() && char !== char.toLowerCase();
}

function convertToEventName(attr) {
  return attr.slice(2, 3).toLowerCase() + attr.slice(3);
}

function isEventName(attr) {
  if (
    !attr.startsWith("on") ||
    !isUpperCase(attr[2]) ||
    !ALL_EVENTS.includes(convertToEventName(attr))
  ) {
    return false;
  }
  return true;
}
