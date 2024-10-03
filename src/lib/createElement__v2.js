import { addEvent } from "./eventManager";
import { createElement__v2 } from "./createElement__v2";

function isPrimitive(vNode) {
  return typeof vNode === "string" || typeof vNode === "number";
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

  if (isPrimitive(vNode)) {
    return document.createTextNode(vNode);
  }

  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => fragment.appendChild(createElement__v2(child)));
    return fragment;
  }

  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => fragment.appendChild(createElement__v2(child)));
    return fragment;
  }

  const $element = document.createElement(vNode.type);

  if (vNode.props) {
    for (const [key, value] of Object.entries(vNode.props)) {
      if (key.startsWith("on") && typeof value === "function") {
        const event = key.slice(2).toLowerCase();
        addEvent($element, event, value);
      } else if (key === "className") {
        $element.setAttribute("class", value);
      } else {
        $element.setAttribute(key, value);
      }
    }
  }

  if (vNode.children) {
    vNode.children
      .filter((el) => el)
      .forEach((child) => {
        $element.appendChild(createElement__v2(child));
      });
  }

  return $element;
}
