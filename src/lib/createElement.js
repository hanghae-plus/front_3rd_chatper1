// TODO: createElement 함수 구현
// 1. vNode가 falsy면 빈 텍스트 노드를 반환합니다.
// 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
// 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
// 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
// 5. 위 경우가 아니면 실제 DOM 요소를 생성합니다:
//    - vNode.type에 해당하는 요소를 생성
//    - vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
//    - vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가


// element 속성 적용
function createElementProps(element, props) {
  if (!!props) {
    for (const [key,value] of Object.entries(props)) {
      const isEventHandler = key.startsWith('on') && typeof value === 'function'
      if (isEventHandler) {
        // prop이 handler일 경우 이벤트 등록
        element.addEventListener(key.slice(2).toLowerCase(), value);

      } else if (key === 'className') {
        // prop이 class명일 경우 class 등록
        element.className = value;

      } else {
        element.setAttribute(key, value);

      }
    }
  }
}

// virtual dom node를 실제 dom node로 변환
export function createElement(vNode) {

  // null 입력에 대해 빈 텍스트 노드를 생성해야 한다
  // false 입력에 대해 빈 텍스트 노드를 생성해야 한다
  if (!vNode) {
    return document.createTextNode('');
  }

  // 문자열 입력에 대해 텍스트 노드를 생성해야 한다
  // 숫자 입력에 대해 텍스트 노드를 생성해야 한다
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(String(vNode));
  }

  // 배열 입력에 대해 DocumentFragment를 생성해야 한다
  if (Array.isArray(vNode)) {
    // documentFragment : 메인 DOM 트리에 포함되지 않는, 가상 메모리에 존재하는 DOM 노드 객체 (repaint X)
    const fragment = document.createDocumentFragment();

    for (const value of vNode) {
      fragment.appendChild(createElement(value))
    }

    return fragment
  }

  // 함수 컴포넌트를 처리해야 한다
  if (typeof vNode.type === "function") {
    return createElement(vNode.type(vNode.props || {}));
  }

  const element = document.createElement(vNode.type);
  createElementProps(element, vNode.props)

  // 중첩된 자식 요소를 올바르게 처리해야 한다
  if (vNode.children) {
    const fragment = document.createDocumentFragment();

    for (const value of vNode.children) {
      fragment.appendChild(createElement(value))
    }
    element.appendChild(fragment);
  }

  return element;
}

