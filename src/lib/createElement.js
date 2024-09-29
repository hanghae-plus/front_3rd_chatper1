// TODO: createElement 함수 구현
// 1. vNode가 falsy면 빈 텍스트 노드를 반환합니다.
// 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
// 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
// 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
// 5. 위 경우가 아니면 실제 DOM 요소를 생성합니다:
//    - vNode.type에 해당하는 요소를 생성
//    - vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
//    - vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가

export function createElement(vNode) {

  /**
    * @terms vNode가 falsy면 빈 텍스트 노드를 반환하는 기능 조건
    * @desc vNode가 null, undefined 또는 false와 같은 falsy 값인 경우, 빈 텍스트 노드를 반환
  */

  if (!vNode) {
    return document.createTextNode('');
  }

  /**
    * @terms vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환하는 기능 조건
    * @desc 입력된 vNode 값을 String으로 변환하여 텍스트 노드를 생성
  */

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(String(vNode));
  }

  /**
    * @desc createElement 함수 내에서 vNode가 배열인지 처리
  */

  if (Array.isArray(vNode)) {
    return createFragment(vNode);
  }

  /**
    * @desc createElement 함수 내에서 vNode의 type이 함수형일때 처리
  */

  if (typeof vNode.type === 'function') {
    return createElement(handleFunctionalComponent(vNode));
  }

  return createDOMElement(vNode);
}

  /**
    * @function createFragment
    * @terms vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가
    * @desc 배열 처리를 위해 DocumentFragment를 사용하여 배열 요소에 대해 createElement를 재귀적으로 호출하고, 생성된 모든 노드를 DocumentFragment에 추가
  */

function createFragment(nodes) {
  const fragment = document.createDocumentFragment();
  nodes.forEach(node => fragment.appendChild(createElement(node)));
  return fragment;
}

  /**
    * @function handleFunctionalComponent
    * @terms vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출
    * @desc 해당 vNode를 다시 createElement 함수에 전달하여 반환된 결과를 가지고 재귀적으로 실제 DOM 노드를 생성
  */

function handleFunctionalComponent(vNode) {
  const componentVNode = vNode.type(vNode.props || {});
  return createVNode(componentVNode.type, componentVNode.props, ...componentVNode.children);
}

  /**
    * @function createDOMElement
    * @terms 실제 DOM 요소 생성
    * @desc vNode의 type을 기반으로 새로운 DOM 요소를 생성하고, 주어진 vNode의 타입을 사용하여 document.createElement를 호출하고, 이를 통해 반환된 DOM 요소에 vNode.props를 적용
  */

function createDOMElement(vNode) {
  const element = document.createElement(vNode.type);
  applyProps(element, vNode.props);

  return element;
}
  