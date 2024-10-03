// TODO: createElement 함수 구현

export function createElement(vNode) {
  // 1. vNode가 falsy면 빈 텍스트 노드를 반환합니다.
  if (!vNode) {
    return document.createTextNode('')
  }

  // 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(vNode)
  }

  // 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment()
    vNode.forEach((child) => {
      fragment.appendChild(createElement(child))
    })
    return fragment
  }

  // 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
  if (typeof vNode.type === 'function') {
    const componentVNode = vNode.type(vNode.props || {})
    return createElement(componentVNode)
  }

  // 5. 위 경우가 아니면 실제 DOM 요소를 생성합니다:
  //    - vNode.type에 해당하는 요소를 생성
  const domElement = document.createElement(vNode.type)

  //    - vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
  if (vNode.props) {
    Object.keys(vNode.props).forEach((propName) => {
      const propValue = vNode.props[propName]

      // 이벤트 리스너인 경우 처리 (onClick 등)
      if (propName.startsWith('on') && typeof propValue === 'function') {
        const eventName = propName.slice(2).toLowerCase()
        domElement.addEventListener(eventName, propValue)
      }
      // className 처리
      else if (propName === 'className') {
        domElement.className = propValue
      }
      // 일반 속성 처리 (style, id, etc)
      else {
        domElement.setAttribute(propName, propValue)
      }
    })
  }

  //    - vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가
  if (vNode.children) {
    vNode.children.forEach((child) => {
      domElement.appendChild(createElement(child))
    })
  }

  return domElement
}
