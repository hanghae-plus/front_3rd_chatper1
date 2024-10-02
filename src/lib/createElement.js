/**
 * 가상 노드를 받아 실제 DOM 노드를 생성하고 반환하는 함수
 * @function createElement
 * @param {Object} vNode - 가상 노드 객체
 * @returns {Node} 생성된 DOM 노드
 * 
 **/

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
    * @terms vNode가 배열일 경우 DocumentFragment를 생성하는 기능 조건
    * @desc 각 요소에 대해 createElement를 재귀적으로 호출하고, 결과를 DocumentFragment에 추가
  */

  if (Array.isArray(vNode)) {
    if (vNode.length === 0) return document.createTextNode('');
    const fragment = new DocumentFragment();
    vNode.forEach((child) => fragment.appendChild(createElement(child)));
    return fragment;
  }

  /**
    * @terms vNode의 type이 함수형인 경우 처리 기능 조건
    * @desc 해당 함수를 호출하여 반환된 결과로 createElement를 재귀적으로 호출
  */

  if (typeof vNode.type === 'function') {
    return createElement(vNode.type(vNode.props, vNode.children));
  }

  /**
  * @terms 실제 DOM 요소 생성
  * @desc vNode의 type을 기반으로 새로운 DOM 요소를 생성하고, 주어진 vNode의 타입을 사용하여 document.createElement를 호출하고, 이를 통해 반환된 DOM 요소에 vNode.props를 적용
  */

  const element = document.createElement(vNode.type);
  applyPropsToElement(element, vNode.props);
  vNode.children.forEach((child) => {
    element.appendChild(createElement(child));
  });

  return element;
}

/**
 * 주어진 DOM 요소에 속성들을 적용
 * 이 함수는 이벤트 리스너, 스타일, 클래스 등 다양한 HTML 속성을 설정
 * @function applyPropsToElement
 * @param {HTMLElement} element - 속성을 적용할 DOM 요소
 * @param {Object} props - 적용할 속성들을 담고 있는 객체
 * @desc 이 함수는 props 객체 내의 각 속성을 확인하고, 적절하게 DOM 요소에 적용
 * 이벤트 핸들러는 'on'으로 시작하는 속성명에서 추출되며, className은 요소의 클래스 속성을 설정
 * 스타일 객체는 요소에 인라인 스타일로 적용되며, 그 외의 속성은 setAttribute를 통해 적용
 */

function applyPropsToElement(element, props) {
  for (const key in props) {
    const value = props[key];
    if (key.startsWith('on') && typeof value === 'function') {
      element.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (key === 'className') {
      element.className = value;
    } else if (key === 'style') {
      element.setAttribute(Object.entries(value));
    } else {
      element.setAttribute(key, value);
    }
  }
}