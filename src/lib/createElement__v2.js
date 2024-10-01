import { addEvent } from "./eventManager";

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
  } else if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  } else if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => {
      fragment.appendChild(createElement__v2(child));
    });
    return fragment;
  } else if (typeof vNode.type === "function") {
    return createElement(vNode.type(vNode.props));
  } else {
    const $el = document.createElement(vNode.type);

    for (const [k, v] of Object.entries(vNode.props || {})) {
      if (k.startsWith("on")) {
        const eventType = k.slice(2).toLowerCase();
        if (typeof v === "function") {
          $el.classList.add("delegate-event");
          addEvent($el, eventType, v);
        }
      } else if (k === "className") {
        $el.setAttribute("class", v);
      } else {
        $el.setAttribute(k, v);
      }
    }
    (vNode.children || []).forEach((child) => {
      $el.appendChild(createElement__v2(child));
    });
    return $el;
  }
}
