import { addEvent } from "./eventManager";

// 가상 DOM 노드를 기반으로 실제 DOM 요소를 생성하는 함수
export function createElement__v2(vNode) {
  // 빈 노드 처리
  if (!vNode) {
    return document.createTextNode(""); // 빈 텍스트 노드 반환
  }

  // 문자열 또는 숫자 노드 처리
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode); // 텍스트 노드 반환
  }

  // 배열 노드 처리
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment(); // DocumentFragment 생성
    vNode.forEach((child) => {
      const childElement = createElement__v2(child); // 각 자식 노드에 대해 재귀 호출
      fragment.appendChild(childElement); // DocumentFragment에 추가
    });
    return fragment; // 완성된 Fragment 반환
  }

  // 함수형 노드 컴포넌트 처리
  if (typeof vNode.type === "function") {
    const componentVNode = vNode.type(vNode.props); // 해당 함수를 호출하여 컴포넌트 노드 생성
    return createElement__v2(componentVNode); // 그 결과로 createElement__v2를 재귀 호출
  }

  // 그 외의 처리
  const $element = document.createElement(vNode.type); // vNode.type에 해당하는 DOM 요소 생성
  if (process.env.NODE_ENV === "development") {
    console.log("DOM 요소를 생성합니다:", vNode.type);
  }

  // vNode.props의 속성들을 적용
  if (vNode.props) {
    for (const [key, value] of Object.entries(vNode.props)) {
      if (key.startsWith("on")) {
        // 이벤트 리스너 처리 (onClick, onChange 등)
        const eventType = key.slice(2).toLowerCase(); // 'onClick' -> 'click'
        addEvent($element, eventType, value); // 이벤트 리스너 추가
      } else if (key === "className") {
        // className을 class 속성으로 설정
        $element.className = value;
      } else {
        // 일반 속성 설정 (예: id, data-* 등)
        $element.setAttribute(key, value);
      }
    }
  }

  // vNode.children의 각 자식 노드에 대해 createElement__v2 재귀 호출하여 추가
  if (vNode.children) {
    vNode.children.forEach((child) => {
      const childElement = createElement__v2(child); // 자식 노드에 대해 재귀 호출
      $element.appendChild(childElement); // 자식 노드를 DOM에 추가
    });
  }

  return $element; // 완성된 DOM 요소 반환
}
