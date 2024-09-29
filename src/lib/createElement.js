import { createVNode } from './createVNode';

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
  appendChildren(element, vNode.children);
  return element;
}

/**
  * @function applyProps
  * @terms vNode.props를 DOM 요소에 적용
  * @desc 전체적으로 DOM 요소에 속성들을 적용
  * props 객체의 각 엔트리를 반복하며, 이벤트 리스너, className, 스타일, 그 외 일반 속성 등을 설정 
  * 이벤트 리스너는 on으로 시작하는 속성명을 감지하고, 해당 이벤트를 요소에 연결
  * className은 요소의 CSS 클래스를 설정하며, style 객체는 요소의 인라인 스타일을 조작
  * 그 외의 속성들은 모두 setAttribute를 사용하여 적용
*/

function applyProps(element, props) {
  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      if (key.startsWith('on') && typeof value === 'function') {
        element.addEventListener(key.slice(2).toLowerCase(), value);
      } else if (key === 'className') {
        element.className = value;
      } else if (key === 'style' && typeof value === 'object') {
        Object.assign(element.style, value);
      } else {
        element.setAttribute(key, value);
      }
    });
  }
}

/**
  * @function appendChildren
  * @terms vNode.children을 부모 DOM 요소에 추가
  * @desc 각 자식 vNode에 대해 createElement를 호출하여 반환된 DOM 노드를 부모 요소에 appendChild 메소드를 사용하여 추가
*/

function appendChildren(element, children) {
  if (children) {
    children.forEach(child => {
      element.appendChild(createElement(child));
    });
  }
}
