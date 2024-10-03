
// element 속성 적용
import {addEvent} from "./eventManager.js";

function createElementProps__v2(element, props) {
  if (!!props) {
    for (const [key,value] of Object.entries(props)) {
      const isEventHandler = key.startsWith('on') && typeof value === 'function'
      if (isEventHandler) {
        // prop이 handler일 경우 이벤트 등록
        // element.addEventListener(key.slice(2).toLowerCase(), value);
        const eventType = key.slice(2).toLowerCase()
        addEvent(element, eventType, value)
      } else if (key === 'className') {
        // prop이 class명일 경우 class 등록
        element.className = value;

      } else {
        element.setAttribute(key, value);

      }
    }
  }
}

// virtual dom node를 실제 dom node로 변환
export function createElement__v2(vNode) {
  // 이 함수는 createElement의 개선된 버전입니다.
// 1. falsy vNode 처리
// 2. 문자열 또는 숫자 vNode 처리
// 3. 배열 vNode 처리 (DocumentFragment 사용)
// 4. 일반 요소 vNode 처리:
//    - 요소 생성
//    - 속성 설정 (이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선)
//    - 자식 요소 추가

  // null 입력에 대해 빈 텍스트 노드를 생성해야 한다
  // false 입력에 대해 빈 텍스트 노드를 생성해야 한다
  if (!vNode) {
    return document.createTextNode('');
  }

  // 문자열 입력에 대해 텍스트 노드를 생성해야 한다
  // 숫자 입력에 대해 텍스트 노드를 생성해야 한다
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(String(vNode));
  }

  // 배열 입력에 대해 DocumentFragment를 생성해야 한다
  if (Array.isArray(vNode)) {
    // documentFragment : 메인 DOM 트리에 포함되지 않는, 가상 메모리에 존재하는 DOM 노드 객체 (repaint X)
    const fragment = document.createDocumentFragment();

    for (const value of vNode) {
      fragment.appendChild(createElement__v2(value))
    }

    return fragment
  }

  // 함수 컴포넌트를 처리해야 한다
  if (typeof vNode.type === "function") {
    return createElement__v2(vNode.type(vNode.props || {}));
  }

  const element = document.createElement(vNode.type);
  createElementProps__v2(element, vNode.props)

  // 중첩된 자식 요소를 올바르게 처리해야 한다
  if (vNode.children) {
    const fragment = document.createDocumentFragment();

    for (const value of vNode.children) {
      fragment.appendChild(createElement__v2(value))
    }
    element.appendChild(fragment);
  }

  return element;
}

