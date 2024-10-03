import { addEvent } from "./eventManager";

export function createElement__v2(vNode) {
  // 1. falsy vNode 처리 -> null, undefined, false, true 면 빈 텍스트 노드 반환
  if (vNode === null || vNode === undefined || typeof vNode === "boolean")
    return document.createTextNode("");

  // 2. 문자열 또는 숫자 vNode 처리
  if (typeof vNode === "string" || typeof vNode === "number")
    return document.createTextNode(vNode);

  // 3. 배열 vNode 처리 (DocumentFragment 사용)
  if (Array.isArray(vNode)) {
    if (vNode.length === 0) return document.createTextNode(""); // 빈 배열일 경우 빈 텍스트 노드 반환
    const fragment = new DocumentFragment();
    vNode.forEach((child) => fragment.appendChild(createElement__v2(child)));
    return fragment;
  }

  // 4. 일반 요소 vNode 처리
  const domElement = document.createElement(vNode.type);

  // 속성 설정 - 이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선
  for (const name in vNode.props) {
    const value = vNode.props[name];

    if (name.startsWith("on") && typeof value === "function") {
      const eventName = name.slice(2).toLowerCase(); // onClick -> click 으로 변환
      addEvent(domElement, eventName, value);
    }
    // className을 class로 변환하여 설정
    else if (name === "className") {
      domElement.setAttribute("class", value || "");
    } else {
      domElement.setAttribute(name, value);
    }
  }

  // 자식 요소 추가
  for (const child of vNode.children) {
    domElement.appendChild(createElement__v2(child));
  }

  domElement._vNode = vNode;

  // element 반환
  return domElement;
}
