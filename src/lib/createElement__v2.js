import { addEvent } from "./eventManager";

export function createElement__v2(vNode, eventManager) {
  // 1. null, undefined, boolean 값 처리: 빈 텍스트 노드를 반환합니다.
  if (!vNode || typeof vNode === "boolean") {
    return document.createTextNode("");
  }

  // 2. 문자열 또는 숫자 vNode 처리: 텍스트 노드를 반환합니다.
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }

  // 3. 배열 vNode 처리: DocumentFragment를 사용하여 각 자식 vNode를 재귀적으로 처리합니다.
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((childVNode) => {
      fragment.appendChild(createElement__v2(childVNode, eventManager));
    });
    return fragment;
  }

  // 4. 함수형 컴포넌트 처리
  if (typeof vNode.type === "function") {
    return createElement__v2(vNode.type(vNode.props || {}), eventManager);
  }

  // 5. 일반 DOM 요소 처리
  const element = document.createElement(vNode.type);

  // 6. props 처리: 이벤트 위임 방식으로 이벤트 리스너를 등록하고, className 및 일반 속성 처리
  Object.entries(vNode.props || {}).forEach(([key, value]) => {
    if (key === "className") {
      element.className = value;
    } else if (key.startsWith("on") && typeof value === "function") {
      // 이벤트 위임
      const eventType = key.slice(2).toLowerCase(); // "onClick" -> "click"
      addEvent(element, eventType, value);
    } else {
      element.setAttribute(key, value);
    }
  });

  // 7. 자식 노드를 재귀적으로 처리하여 추가합니다.
  (vNode.children || []).forEach((childVNode) => {
    element.appendChild(createElement__v2(childVNode, eventManager));
  });

  return element;
}
