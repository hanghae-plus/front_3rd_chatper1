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
 * DOM 요소에 속성들을 설정하고 이벤트 위임을 활용하여 이벤트 리스너를 등록하는 함수
 * 
 * @function applyProps
 * @param {HTMLElement} element - 속성을 적용할 DOM 요소
 * @param {Object} props - 속성들을 포함하는 객체. 이벤트 리스너, 스타일, 클래스 등을 포함
 * @desc
 * 이벤트 리스너는 `on`으로 시작하는 속성명을 감지하여, document 레벨에서 이벤트 위임을 통해 처리
 *   각 이벤트 타입에 대해 이벤트 위임 배열을 생성하고, 발생된 이벤트가 등록된 요소와 일치할 때 실행
 * `className` 속성을 통해 요소의 클래스를 설정
 * `style` 객체를 사용하여 요소의 스타일을 인라인으로 직접 조작
 * 기타 속성은 `setAttribute`를 사용하여 요소에 직접 적용
 */

function applyProps(element, props) {
  const eventDelegation = {};

  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      if (key.startsWith('on') && typeof value === 'function') {
        const eventType = key.slice(2).toLowerCase();
        eventDelegation[eventType] = eventDelegation[eventType] || [];
        eventDelegation[eventType].push({ target: element, handler: value });
      } else if (key === 'className') {
        element.className = value;
      } else if (key === 'style' && typeof value === 'object') {
        Object.assign(element.style, value);
      } else {
        element.setAttribute(key, value);
      }
    });
  }

  Object.keys(eventDelegation).forEach(eventType => {
    document.addEventListener(eventType, (e) => {
      eventDelegation[eventType].forEach(event => {
        if (e.target === event.target) {
          event.handler(e);
        }
      });
    });
  });
}
