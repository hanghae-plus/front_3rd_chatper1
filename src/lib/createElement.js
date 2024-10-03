/**
 * 가상 DOM 노드를 실제 DOM 노드로 변환하는 함수입니다.
 * 
 * @param {object|string|number|null} vNode - 가상 DOM 노드 또는 텍스트 노드
 * @returns {HTMLElement|DocumentFragment|Text} - 실제 DOM 요소 또는 텍스트 노드
 * 
 * 이 함수는 다음과 같은 작업을 수행합니다:
 * 1. falsy한 vNode 처리 (null, undefined, false 등은 빈 텍스트 노드로 처리).
 * 2. 문자열 또는 숫자 vNode는 텍스트 노드로 변환하여 반환.
 * 3. 배열로 주어진 vNode는 DocumentFragment를 생성하고, 배열의 각 자식들을 재귀적으로 처리하여 추가.
 * 4. 함수형 컴포넌트는 해당 함수를 실행하여 반환된 결과를 재귀적으로 처리.
 * 5. 나머지 경우는 실제 DOM 요소를 생성하고, props와 자식 요소를 설정하여 반환.
 */
export function createElement(vNode) {
  // 1. falsy한 vNode 처리 (null, undefined, false 등)
  if (!vNode) return document.createTextNode('');

  // 2. 문자열 또는 숫자 처리
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(vNode);
  }

  // 3. 배열 처리 (DocumentFragment 생성)
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    for (const child of vNode) {
      fragment.appendChild(createElement(child));
    }
    return fragment;
  }

  // 4. 함수형 컴포넌트 처리
  if (typeof vNode.type === 'function') {
    return createElement(vNode.type(vNode.props || {}));
  }

  // 5. 일반 DOM 요소 생성
  const element = document.createElement(vNode.type);

  // 6. props 적용
  setProps(element, vNode.props);

  // 7. children 재귀 처리
  for (const child of (vNode.children || [])) {
    element.appendChild(createElement(child));
  }

  return element;
}

/**
 * 실제 DOM 요소에 props를 적용하는 함수입니다.
 * 
 * @param {HTMLElement} element - 실제 DOM 요소
 * @param {object} props - 요소에 설정할 속성 객체
 */
function setProps(element, props = {}) {
  for (const propName of Object.keys(props || {})) {
    const value = props[propName];

    // falsy 값(null, undefined, false) 속성 무시
    if (value == null || value === false) continue;

    // 이벤트 리스너 처리
    if (propName.startsWith('on') && typeof value === 'function') {
      const eventType = propName.slice(2).toLowerCase();
      element.addEventListener(eventType, value);
      continue;
    }

    // className 처리
    if (propName === 'className') {
      element.className = value;
      continue;
    }

    // style 처리
    if (propName === 'style' && typeof value === 'object') {
      Object.assign(element.style, value);
      continue;
    }

    // 나머지 일반 속성 처리
    element.setAttribute(propName, value);
  }
}
