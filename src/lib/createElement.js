/**
 * @function createElement
 * @desc 가상 노드를 받아 실제 DOM 노드를 생성하고 반환하는 함수
 * @param {Object|string|number|boolean|null} vNode 가상 노드 객체, 문자열, 숫자, 불리언 값, 또는 null
 * @returns {Node} 생성된 DOM 노드
 * 
 **/

export function createElement(vNode) {

  /**
    * @desc vNode가 null, undefined면 빈 텍스트 노드를 반환하는 기능 조건
  */
  if (vNode === null || vNode === undefined) {
    return document.createTextNode('');
  }
  
  /**
    * @desc vNode가 false와 같은 falsy 값인 경우, 빈 텍스트 노드를 반환
  */
  
  if (typeof vNode === 'boolean') {
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
  * @desc vNode의 type을 기반으로 새로운 DOM 요소를 생성, 
  * 주어진 vNode의 타입을 사용하여 document.createElement를 호출,
  * 이를 통해 반환된 DOM 요소에 vNode.props를 적용
  */

  const element = document.createElement(vNode.type);
  applyPropsToElement(element, vNode.props);

  (vNode.children || []).forEach(child => {
    element.appendChild(createElement(child));
  });

  return element;
}

/**
 * @function applyPropsToElement
 * @desc 주어진 `props` 객체의 모든 속성을 DOM 요소에 일괄적으로 적용
 * 이 함수는 이벤트 핸들러, 클래스, 스타일, 그리고 기타 속성을 포함하여 DOM 요소에 적용
 * - 이벤트 핸들러는 `on`으로 시작하는 속성명에서 추출하여 등록
 * - `className` 속성은 요소의 클래스 목록에 적용
 * - `style` 객체는 각 스타일 속성을 요소에 인라인으로 적용
 *    스타일 적용 중에 예외가 발생할 경우 경고를 출력하며 해당 스타일은 무시됨
 * - 그 외의 속성들은 `setAttribute`를 사용하여 적용
 * 
 * @param {HTMLElement} element - 속성을 적용할 DOM 요소
 * @param {Object} props - 적용할 속성들을 담고 있는 객체
 */

function applyPropsToElement(element, props) {
  Object.entries(props || {}).forEach(([key, value]) => {
    if (key.startsWith('on') && typeof value === 'function') {
      element.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (key === 'className') {
      element.className = value;
    } else if (key === 'style') {
      Object.entries(value).forEach(([styleKey, styleValue]) => {
        element.style[styleKey] = styleValue;
      });
    } else {
      element.setAttribute(key, value);
    }
  });
}