import { addEvent } from "./eventManager";

export function createElement__v2(vNode) {
  // 이 함수는 createElement의 개선된 버전입니다.

  // 1. falsy vNode 처리
  if (!vNode) {
    return document.createTextNode("");
  }

  // 2. 문자열 또는 숫자 vNode 처리
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }

  // 3. 배열 vNode 처리 (DocumentFragment 사용)
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => {
      fragment.appendChild(createElement__v2(child));
    });
    return fragment;
  }

  if (typeof vNode.type === "function") {
    const componentInstance = vNode.type(vNode.props);
    return createElement__v2(componentInstance);
  }

  const element = document.createElement(vNode.type);

  // 4. 일반 요소 vNode 처리:
  //    - 요소 생성
  //    - 속성 설정 (이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선)
  //    - 자식 요소 추가

  // - vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
  for (const prop in vNode.props) {
    if (prop === "className") {
      element.className = vNode.props[prop];
    } else if (prop.startsWith("on")) {
      // 이벤트 리스너 처리
      const eventType = prop.slice(2).toLowerCase(); // 'onClick' -> 'click'
      // element.addEventListener(eventType, vNode.props[prop]);
      addEvent(element, eventType, vNode.props[prop]); // 이벤트 위임 사용
    } else {
      element.setAttribute(prop, vNode.props[prop]);
    }
  }
  // - vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가
  if (vNode.children) {
    vNode.children.forEach((child) => {
      const childNode = createElement__v2(child);
      element.appendChild(childNode);
    });
  }

  return element;
}
