export function createElement(vNode) {
  // 1. vNode가 falsy면 빈 텍스트 노드를 반환합니다.
  if (!vNode) {
    return document.createTextNode("")
  }

  // 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode)
  }

  // 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment()

    vNode.forEach((child) => fragment.appendChild(createElement(child)))

    return fragment
  }

  // 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
  if (typeof vNode.type === "function") {
    return createElement(vNode.type(vNode.props))
  }

  // 5 - 1 vNode.type에 해당하는 요소를 생성
  const element = document.createElement(vNode.type)

  // 5 - 2 vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
  if (vNode.props) {
    Object.entries(vNode.props).forEach(([key, value]) => {
      // on으로 시작하는거 체크
      if (key.startsWith("on")) {
        const event = key.toLowerCase().substring(2)
        // 이벤트 리스너 추가
        element.addEventListener(event, value)
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

  // 5 - 3 vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가
  if (vNode.children) {
    const fragment = document.createDocumentFragment()

    vNode.children.forEach((child) =>
      fragment.appendChild(createElement(child))
    )
    element.appendChild(fragment)
  }

  return element
}
