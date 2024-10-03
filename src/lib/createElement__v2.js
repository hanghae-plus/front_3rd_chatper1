import { addEvent } from "./eventManager";
// 이 함수는 createElement의 개선된 버전입니다.

export function createElement__v2(vNode) {
  // 1. falsy vNode 처리
  if (!vNode) {
    return document.createTextNode("");
  }

  // 2. 문자열 또는 숫자 vNode 처리
  if (typeof vNode == "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }

  // 3. 배열 vNode 처리 (DocumentFragment 사용)
  if (Array.isArray(vNode)) {
    const $fragment = document.createDocumentFragment();
    vNode.forEach((children) => {
      $fragment.appendChild(createElement__v2(children));
    });
    return $fragment;
  }

  //vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
  if (typeof vNode.type === "function") {
    return createElement__v2(vNode.type(vNode.props));
  }

  // 위 경우가 아니면 실제 DOM 요소를 생성합니다.
  // - vNode.type에 해당하는 요소를 생성
  const $element = document.createElement(vNode.type);

  // 4. 일반 요소 vNode 처리:
  //    - 요소 생성
  //    - 속성 설정 (이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선)
  //    - 자식 요소 추가
  for (const [key, value] of Object.entries(vNode.props || {})) {
    if (typeof value === "function" && key.startsWith("on")) {
      const eventType = key.toLowerCase().slice(2);
      addEvent($element, eventType, value);
    } else if (key === "className") {
      $element.className = value;
    } else if (key.startsWith("data-")) {
      // 데이터 속성 처리
      $element.setAttribute(key, value);
    } else {
      $element.setAttribute(key, value);
    }
  }

  // - vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가
  (vNode.children || []).forEach((children) => {
    $element.appendChild(createElement__v2(children));
  });

  return $element;
}
