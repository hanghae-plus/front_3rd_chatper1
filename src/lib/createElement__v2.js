import { addEvent } from './eventManager';

/**
 * @function createElement__v2
 * @terms 가상 노드 객체를 받아 실제 DOM 노드를 생성하고 반환하는 createElement의 개선된 버전 
 * 주어진 가상 노드의 속성을 적용하고 자식 노드를 재귀적으로 생성하여 현재 노드에 추가
 * @param {Object} vNode - 생성할 가상 노드 객체
 * @returns {Node} - 생성된 DOM 노드
 * @desc 일반 요소는 props를 적용하고 자식 노드를 재귀적으로 추가
 */
export const createElement__v2 = (vNode) => {

  /**
    * @terms vNode가 falsy면 빈 텍스트 노드를 반환하는 기능 조건
    * @desc vNode가 null, undefined 또는 false와 같은 falsy 값인 경우, 빈 텍스트 노드를 반환
  */
  if (!vNode || typeof vNode === 'boolean') {
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
   * @description vNode가 배열인 경우, 각 요소에 대해 재귀적으로 createElement__v2를 호출
   * 그 결과를 DocumentFragment에 추가하여 반환
   * 배열이 빈 경우에는 빈 텍스트 노드를 반환
   */
  if (Array.isArray(vNode)) {
    if (vNode.length === 0) return document.createTextNode('');
    const fragment = new DocumentFragment();
    vNode.forEach((child) => fragment.appendChild(createElement__v2(child))); // 수정: 함수 호출 명 변경
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
   * @description vNode의 props 속성을 순회하며, 각 속성을 DOM 요소에 적용 
   */
  Object.entries(vNode.props || {}).forEach(([key, value]) => {
    applyPropsBatch(element, key, value);
  });

  /**
   * @desc vNode의 자식들(텍스트 노드 또는 다른 DOM 요소)을 재귀적으로 처리하여 현재 요소에 추가
   */
  (vNode.children || []).forEach((child) => {
    element.appendChild(createElement__v2(child));
  });

  return element;
};

/**
 * @function applyPropsBatch
 * @description 주어진 DOM 요소에 속성(key-value 쌍)을 적용합니다.
 * 이벤트 핸들러는 'on'으로 시작하는 속성명에서 추출되며, 'className'은 요소의 클래스 속성으로 설정하고,
 * 스타일 객체는 요소에 인라인 스타일로 적용하며, 그 외의 속성은 setAttribute를 통해 적용합니다.
 * @param {HTMLElement} element - 속성을 적용할 DOM 요소
 * @param {string} key - 속성의 키
 * @param {any} value - 속성의 값
 */
const applyPropsBatch = (element, key, value) => {
  if (key.startsWith('on') && typeof value === 'function') {
    const eventType = key.slice(2).toLowerCase();
    addEvent(eventType, element, value);
  } else if (key === 'className') {
    element.setAttribute('class', value || '');
  } else if (key === 'style') {
    Object.assign(element.style, value);
  } else {
    element.setAttribute(key, value);
  }
};