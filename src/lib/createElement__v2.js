import { addEvent, removeEvent } from "./eventManager";

export function createElement__v2(vNode) {
  // 이 함수는 createElement의 개선된 버전입니다.
  // 1. falsy vNode 처리
  // 2. 문자열 또는 숫자 vNode 처리
  // 3. 배열 vNode 처리 (DocumentFragment 사용)
  // 4. 일반 요소 vNode 처리:
  //    - 요소 생성
  //    - 속성 설정 (이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선)
  //    - 자식 요소 추가
  if (
    vNode === null ||
    vNode === undefined ||
    typeof vNode === "boolean" ||
    (typeof vNode === "object" && Object.keys(vNode).length === 0)
  )
    return document.createTextNode("");

  if (typeof vNode === "string" || typeof vNode === "number")
    return document.createTextNode(vNode);

  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => {
      fragment.appendChild(createElement__v2(child));
    });

    return fragment;
  }

  if (typeof vNode.type === "function") {
    const props = vNode.props || {};
    const children = vNode.children || [];

    return createElement__v2(vNode.type({ ...props, children }));
  }

  const { type, props, children = [] } = vNode;

  if (!type) {
    const fragment = document.createDocumentFragment();
    children.forEach((child) => {
      fragment.appendChild(createElement__v2(child));
    });

    return fragment;
  }

  const element = document.createElement(type);
  if (!!props) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith("on")) {
        const eventType = key.toLowerCase().substring(2);
        addEvent(eventType, element, props[key]);
      } else if (key === "className") {
        element.setAttribute("class", props[key]);
      } else if (key === "style") {
        Object.assign(element.style, props[key]);
      } else {
        element.setAttribute(key, props[key]);
      }
    });
  }

  children.forEach((child) => {
    element.appendChild(createElement__v2(child));
  });

  return element;
}
