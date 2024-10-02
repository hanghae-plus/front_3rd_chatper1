import { addEvent } from "./eventManager"

export function createElement__v2(vNode) {
  // 이 함수는 createElement의 개선된 버전입니다.
  // 1. falsy vNode 처리
  if (!vNode) {
    return document.createTextNode("")
  }
  // 2. 문자열 또는 숫자 vNode 처리
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode)
  }
  // 3. 배열 vNode 처리 (DocumentFragment 사용)
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment()

    vNode.forEach((child) => fragment.appendChild(createElement__v2(child)))

    return fragment
  }

  if (typeof vNode.type === "function") {
    return createElement__v2(vNode.type(vNode.props))
  }

  // 4. 일반 요소 vNode 처리:
  //    - 요소 생성
  const element = document.createElement(vNode.type)
  //    - 속성 설정 (이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선)
  if (vNode.props) {
    Object.entries(vNode.props || {}).forEach(([key, value]) => {
      // on으로 시작하는거 체크
      if (key.startsWith("on")) {
        const event = key.toLowerCase().substring(2)
        // 이벤트 리스너 추가
        // element.addEventListener(event, value)

        // 이벤트 위임 방식으로 변경
        addEvent(element, event, value)

        // 클래스 여부 확인
      } else if (key === "className") {
        // 클래스 추가
        element.className = value
      } else {
        // 속성 추가
        element.setAttribute(key, value)
      }
    })
  }
  //    - 자식 요소 추가
  if (vNode.children) {
    ;(vNode.children || []).forEach((child) => {
      element.appendChild(createElement__v2(child))
    })
  }

  return element
}
