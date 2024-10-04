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
  } else if (typeof vNode === "number" || typeof vNode === "string") {
    return document.createTextNode(vNode);
  }

  if (typeof vNode === "object" && Array.isArray(vNode)) {
    const $fragment = createDocumentFragment();
    vNode.forEach((cNode) => {
      $fragment.appendChild(createElement__v2(cNode));
    });
    return $fragment;
  }

  if (typeof vNode.type === "function") {
    return createElement__v2(
      vNode.type({ ...vNode.props, children: vNode.children })
    );
  } else {
    const $el = document.createElement(vNode.type);
    if (vNode.props) {
      const props = Object.entries(vNode.props);
      props.forEach(([key, value]) => {
        //속성 설정 (이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선)
        if (key.startsWith("on") && typeof value === "function") {
          addEvent($el, vNode.type, value);
        }

        if (key === "className") {
          $el.setAttribute("class", value);
        } else $el.setAttribute(key, value);
      });
    }
    if (vNode.children.length > 0) {
      const childrens = vNode.children;
      childrens.forEach((child) => {
        return $el.appendChild(createElement__v2(child));
      });
    }
    console.log(vNode.children);
    return $el;
  }
  return {};
}
