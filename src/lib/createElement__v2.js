import { addEvent } from './eventManager';

/**
 * createElement 함수의 개선된 버전입니다.
 * 
 * @param {object|string|number|null} vNode - 가상 DOM 노드 또는 텍스트 노드
 * @returns {HTMLElement|DocumentFragment|Text} - 실제 DOM 요소 또는 텍스트 노드
 * 
 * 이 함수는 다음과 같은 작업들을 수행합니다:
 * 1. falsy한 vNode 처리 (null, undefined, false 등은 빈 텍스트 노드로 처리).
 * 2. 문자열 또는 숫자 vNode는 텍스트 노드로 변환하여 반환.
 * 3. 배열은 DocumentFragment로 처리하고, 자식 노드를 재귀적으로 추가.
 * 4. 일반적인 DOM 요소는 다음과 같이 처리:
 *    - 4-1. 요소를 생성.
 *    - 4-2. props에 있는 속성을 설정 (이벤트 핸들러는 이벤트 위임 방식으로 등록).
 *    - 4-3. 자식 요소들을 재귀적으로 처리하여 추가.
 */
export function createElement__v2(vNode) {
  // 1. falsy한 vNode 처리
  if (!vNode || typeof vNode === 'boolean') {
    return document.createTextNode('');
  }

  // 2. 문자열 또는 숫자 vNode 처리
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(vNode);
  }

  // 3. 배열로 주어진 vNode 처리
  if (Array.isArray(vNode)) {
    return appendChildren(document.createDocumentFragment(), vNode.children);
  }

  // 4-1. 일반 DOM 요소 처리
  const element = document.createElement(vNode.type);

  // 4-2. props가 있는 경우 props 설정
  if (vNode.props) {
    setProps(element, vNode.props);
  }

  // 4-3. 자식 요소 처리
  appendChildren(element, vNode.children || []);

  return element;
}

/**
 * 자식 요소들을 처리하여 부모 요소에 추가하는 함수
 * 
 * @param {HTMLElement|DocumentFragment} parent - 부모 요소
 * @param {Array} children - 자식 가상 DOM 노드들
 * @returns {HTMLElement|DocumentFragment} - 자식이 추가된 부모 요소
 */
function appendChildren(parent, children) {
  for (const child of children) {
    parent.appendChild(createElement__v2(child));
  }
  return parent;
}

/**
 * 실제 DOM 요소에 props를 적용하는 함수입니다.
 * 
 * @param {HTMLElement} element - 실제 DOM 요소
 * @param {object} props - 요소에 설정할 속성 객체
 */
function setProps(element, props) {
  for (const propName of Object.keys(props)) {
    const value = props[propName];

    // 이벤트 리스너 처리
    if (propName.startsWith('on') && typeof value === 'function') {
      const eventType = propName.slice(2).toLowerCase();
      addEvent(element, eventType, value);  // 이벤트 위임 방식 사용
      continue;
    }

    // className 처리
    if (propName === 'className') {
      element.className = value;
      continue;
    }

    // style 객체 처리
    if (propName === 'style' && typeof value === 'object') {
      Object.assign(element.style, value);
      continue;
    }

    // 나머지 속성 설정
    element.setAttribute(propName, value);
  }
}