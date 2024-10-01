import { ALL_EVENTS } from "../utils/eventUtils";

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

export function createElement__v2(vNode) {
  // 이 함수는 createElement의 개선된 버전입니다.
  // 1. falsy vNode 처리
  // 2. 문자열 또는 숫자 vNode 처리
  // 3. 배열 vNode 처리 (DocumentFragment 사용)
  // 4. 일반 요소 vNode 처리:
  //    - 요소 생성
  //    - 속성 설정 (이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선)
  //    - 자식 요소 추가

  if (!vNode) {
    return document.createTextNode("");
  }
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((oneNode) => {
      fragment.appendChild(createElement__v2(oneNode));
    });
    return fragment;
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
      $el.appendChild(createElement__v2(child));
    });
  }

  return $el;
}
