import { addEvent } from "./eventManager"; // 이벤트 위임 방식 처리를 위해 addEvent를 가져옵니다.

export function createElement__v2(vNode) {
  // 1. falsy vNode 처리
  if (vNode === null || vNode === undefined || typeof vNode === "boolean") {
    return document.createTextNode("");
  }

  // 2. 문자열 또는 숫자 처리
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }

  // 3. 배열 vNode 처리 (DocumentFragment 사용)
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => {
      const childNode = createElement__v2(child);
      fragment.appendChild(childNode);
    });
    return fragment;
  }

  // 4. 함수형 컴포넌트 처리
  if (typeof vNode.type === "function") {
    const componentVNode = vNode.type(vNode.props || {});
    return createElement__v2(componentVNode);
  }

  // 5. 일반 요소 처리
  const domElement = document.createElement(vNode.type);

  // 6. 속성 설정 (이벤트 위임 방식으로 등록 가능하도록 개선)
  if (vNode.props) {
    Object.keys(vNode.props).forEach((propName) => {
      const propValue = vNode.props[propName];

      // 이벤트 리스너 처리
      if (propName.startsWith("on") && typeof propValue === "function") {
        const eventName = propName.toLowerCase().substring(2); // onClick -> click
        addEvent(domElement, eventName, propValue); // 이벤트 위임을 통해 처리
      } else if (propName === "className") {
        domElement.className = propValue;
      } else {
        domElement.setAttribute(propName, propValue);
      }
    });
  }

  // 7. 자식 요소 처리
  if (vNode.children) {
    vNode.children.forEach((child) => {
      const childNode = createElement__v2(child);
      domElement.appendChild(childNode);
    });
  }

  return domElement;
}
