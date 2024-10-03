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
  }

  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }

  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();

    vNode.forEach((_vNode) => {
      fragment.appendChild(createElement__v2(_vNode));
    });

    return fragment;
  }

  if (typeof vNode.type === "function") {
    return createElement__v2(vNode.type(vNode.props));
  }

  const newEl = document.createElement(vNode.type);
  const _props = vNode.props || {};
  const _children = vNode.children || {};

  Object.entries(_props).forEach(([attr, value]) => {
    if (attr === "className") {
      newEl.setAttribute("class", value);
    } else if (attr.startsWith("on") && typeof value === "function") {
      const event = attr.toLowerCase().substring(2);
      addEvent(newEl, event, value);
    } else {
      newEl.setAttribute(attr, value);
    }
  });

  _children.forEach((child) => {
    newEl.appendChild(createElement__v2(child));
  });

  return newEl;
}
