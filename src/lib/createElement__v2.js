import { addEvent } from './eventManager';

/**
 * @function createElement__v2
 * @terms 가상 노드 객체를 받아 실제 DOM 노드를 생성하고 반환하는 createElement의 개선된 버전 
 * 주어진 가상 노드의 속성을 적용하고 자식 노드를 재귀적으로 생성하여 현재 노드에 추가
 * @param {Object|string|number|boolean|null} vNode - 생성할 가상 노드 객체 또는 기본 데이터 타입
 * @returns {Node} - 생성된 DOM 노드
 * @desc 일반 요소는 props를 적용하고 자식 노드를 재귀적으로 추가
 */
export const createElement__v2 = (vNode) => {

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
   * @desc vNode가 배열인 경우, 각 요소에 대해 재귀적으로 createElement__v2를 호출
   * 그 결과를 DocumentFragment에 추가하여 반환
   * 배열이 빈 경우에는 빈 텍스트 노드를 반환
   */
  if (Array.isArray(vNode)) {
    const fragment = new DocumentFragment();
    vNode.forEach((child) => fragment.appendChild(createElement__v2(child)));
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
 * @desc 주어진 DOM 요소에 하나의 속성(key-value 쌍)을 적용
 * 이 함수는 이벤트 핸들러, 클래스, 스타일 및 일반 속성을 요소에 적용하는 기능을 수행
 * - 이벤트 핸들러는 `on`으로 시작하는 키에서 추출하여 등록하고, `addEventListener`를 사용하여 요소에 이벤트를 바인드
 * - `className`은 요소의 클래스 속성으로 직접 설정되며, 비어 있는 경우 비워진 상태로 설정
 * - `style`은 객체 형식으로 제공되며, 각 스타일 속성(key-value 쌍)을 요소의 인라인 스타일로 적용
 *   스타일 적용 과정에서 유효하지 않은 스타일 속성이나 값에 대해서는 콘솔에 경고를 출력하고, 해당 스타일은 무시
 * - 그 외의 속성은 `setAttribute`를 사용하여 적용
 *   이 때, `setAttribute`가 실패하거나 예외를 발생시킬 경우, 해당 예외는 콘솔에 로그되며, 프로세스는 지속됨
 * 
 * @param {HTMLElement} element - 속성을 적용할 DOM 요소
 * @param {string} key - 적용할 속성의 키
 * @param {any} value - 적용할 속성의 값
 */

const applyPropsBatch = (element, key, value) => {
  if (key.startsWith('on') && typeof value === 'function') {
    const eventType = key.slice(2).toLowerCase();
    addEvent(eventType, element, value);
  } else if (key === 'className') {
    element.setAttribute('class', value || '');
  } else if (key === 'style' && typeof value === 'object') {
    Object.entries(value).forEach(([styleKey, styleValue]) => {
      try {
        if (typeof styleKey === 'string' && styleValue !== undefined && styleValue !== null) {
          element.style[styleKey] = String(styleValue);
        }
      } catch (error) {
        console.warn(`스타일을 설정하는데 실패했습니다. [${styleKey}]:`, error);
      }
    });
  } else {
    element.setAttribute(key, value);
  }
};