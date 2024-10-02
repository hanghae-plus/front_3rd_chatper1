import { addEvent } from './eventManager'
// import { createElement__v2 } from './createElement__v2'
// TODO: createElement 함수 구현
// 1. vNode가 falsy면 빈 텍스트 노드를 반환합니다.
// 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
// 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
// 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
// 5. 위 경우가 아니면 실제 DOM 요소를 생성합니다:
//    - vNode.type에 해당하는 요소를 생성
//    - vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
//    - vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가

const VERSION_1 = 'v1'
const VERSION_2 = 'v2'

function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number'
}

function isFunction(value) {
  return typeof value.type === 'function'
}

function createFragment(vNode) {
  const fragment = document.createDocumentFragment()
  vNode.forEach((child) => fragment.appendChild(createElement(child)))
  return fragment
}

function createFunction(vNode) {
  const component = vNode.type({
    ...vNode.props,
    children: vNode.children,
  })
  return createElement(component)
}

const createStrategies = {
  v1: createElement,
  v2: createElement__v2,
}

const eventStrategies = {
  v1: (element, event, handler) => element.addEventListener(event, handler),
  v2: (element, event, handler) => addEvent(element, event, handler),
}

export function createDomElement(vNode, version) {
  const element = document.createElement(vNode.type)

  Object.entries(vNode.props ?? {}).forEach(([attr, value]) => {
    if (attr.startsWith('on') && typeof value === 'function') {
      const event = attr.toLowerCase().slice(2)
      const createEventFunc = eventStrategies[version] || eventStrategies.v1
      createEventFunc(element, event, value)
    } else if (attr === 'className') {
      element.setAttribute('class', value)
    } else if (value != null) {
      element.setAttribute(attr, value)
    }
  })

  vNode.children?.forEach((child) => {
    if (child) {
      const createElementFunc = createStrategies[version] || createStrategies.v1
      element.appendChild(createElementFunc(child))
    }
  })

  return element
}

export function resolveVNodeType(vNode, version) {
  if (!vNode) return document.createTextNode('')
  if (isPrimitive(vNode)) return document.createTextNode(vNode)
  if (Array.isArray(vNode)) return createFragment(vNode)
  if (isFunction(vNode)) return createFunction(vNode)

  return createDomElement(vNode, version)
}

export function createElement(vNode) {
  return resolveVNodeType(vNode, VERSION_1)
}

export function createElement__v2(vNode) {
  return resolveVNodeType(vNode, VERSION_2)
}
