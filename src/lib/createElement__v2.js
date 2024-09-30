export function createElement__v2(vNode) {

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


  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach(child => fragment.appendChild(createElement__v2(child)));
    return fragment;
  }

  const element = document.createElement(vNode.type);
  applyProps(element, vNode.props);
  vNode.children.forEach(child => {
    element.appendChild(createElement__v2(child));
  });
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