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
  // 1. vNode가 falsy인 경우
  if (!vNode) return document.createTextNode("");

  // 2. 문자열이나 숫자인 경우
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }

  // 3. 배열인 경우
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => fragment.appendChild(createElement__v2(child)));
    return fragment;
  }
  const $el = document.createElement(vNode.type);

  if (vNode.props) {
    Object.entries(vNode.props).forEach(([key, value]) => {
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        if (key === "className") {
          $el.classList.add(...value.split(" "));
        } else {
          $el.setAttribute(key, value);
        }
      } else if (typeof value === "function" && key.toLowerCase() in $el) {
        const eventType = key.toLowerCase().replace("on", "");
        addEvent($el, eventType, value);
      } else if (typeof value === "object") {
        Object.entries(value).forEach(([_key, _value]) => {
          $el[key][_key] = _value;
        });
      } else {
        $el[key] = value;
      }
    });
  }
  if (vNode.children) {
    const child = createElement__v2(vNode.children);
    $el.appendChild(child);
  }

  return $el;
}
