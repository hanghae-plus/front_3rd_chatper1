export function createElement__v2(vNode) {
  // 이 함수는 createElement의 개선된 버전입니다.
  // 1. falsy vNode 처리
  // 2. 문자열 또는 숫자 vNode 처리
  // 3. 배열 vNode 처리 (DocumentFragment 사용)
  // 4. 일반 요소 vNode 처리:
  //    - 요소 생성
  //    - 속성 설정 (이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선)
  //    - 자식 요소 추가
  if (!vNode || typeof vNode === "string" || typeof vNode === "number") {
    const textContent = vNode ? `${vNode}` : "";
    return document.createTextNode(textContent);
  } else if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => {
      const element = createElement__v2(child);
      fragment.appendChild(element);
    });
    return fragment;
  } else if (typeof vNode.type === "function") {
    return createElement__v2(vNode.type(vNode.props));
  } else {
    const element = document.createElement__v2(vNode.type);
    for (const key in vNode.props) {
      const value = vNode.props[key];
      if (key.startsWith("on") && typeof value === "function") {
        element.addEventListener(key.slice(2).toLowerCase(), value);
      } else if (key === "className") {
        element.setAttribute("class", value);
      } else {
        element.setAttribute(key, value);
      }
    }
    (vNode.children || []).forEach((child) =>
      element.appendChild(createElement__v2(child))
    );
  }
}
