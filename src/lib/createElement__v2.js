import { addEvent } from './eventManager';

/**
 * @function createElement__v2
 * @terms 가상 노드 객체를 받아 실제 DOM 노드를 생성하고 반환하는 createElement의 개선된 버전
 * @param {Object} vNode - 생성할 가상 노드 객체
 * @returns {Node} 생성된 DOM 노드
 * @desc 일반 요소는 props를 적용하고 자식 노드를 재귀적으로 추가
 */

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
    return createElement__v2(vNode.type(vNode.props, vNode.children));
  }

  const element = document.createElement(vNode.type);
  
  /**
   * @desc 각 프로퍼티에 대해 적절한 동작을 수행하는 콜백을 설정하여 속성을 적용
   */
  for (const name in vNode.props) {
    applyPropsToElemenByCallback(name, vNode.props[name], {
      eventHandler: (key, value) => {
        addEvent(element, key, value);
        element._vNode = vNode;
      },
      attributeHandler: (key, value) => {
        element.setAttribute(key, value);
      },
    });
  }

  /**
   * @desc vNode의 자식들(텍스트 노드 또는 다른 DOM 요소)을 재귀적으로 처리하여 현재 요소에 추가
   */

  for (const child of vNode.children) {
    element.appendChild(createElement__v2(child));
  }

  return element;
}

/**
 * @function applyPropsToElemenByCallback
 * @terms 주어진 속성 키와 값에 대해 적절한 DOM 작업을 수행하는 콜백 실행
 * @param {string} key - 속성의 키
 * @param {any} value - 속성의 값
 * @param {Object} callback - 속성에 따라 실행할 콜백 함수들을 담고 있는 객체
 * @desc 속성 키가 'on'으로 시작할 경우 이벤트 리스너 추가,
 * 'style'의 경우 스타일 문자열을 생성하여 설정
 * 'className'은 클래스 속성을 설정
 * 기타 다른 속성들은 직접적으로 setAttribute를 사용하여 설정
 */

export function applyPropsToElemenByCallback(key, value, callback) {
  if (key.startsWith('on')) {
    if (!value || typeof value !== 'function') {
      throw new Error('Invalid event handler');
    }
    callback.eventHandler(key.slice(2).toLowerCase(), value);
    return;
  }

  if (key === 'style') {
    const styleString = Object.entries(value)
    callback.attributeHandler('style', styleString);
    return;
  }

  if (key === 'className') {
    callback.attributeHandler('class', value);
    return;
  }

  callback.attributeHandler(key, value);
}