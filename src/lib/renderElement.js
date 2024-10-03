import { createElement__v2 } from './createElement__v2.js';
import { addEvent, removeEvent, setupEventListeners } from './eventManager';

function processVNode(vNode) {
  // null, undefined, boolean 값 처리
  if (vNode == null || typeof vNode === 'boolean') {
    return '';
  }

  // 문자열과 숫자를 문자열로 변환
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return vNode.toString();
  }

  // 함수형 컴포넌트 처리
  if (typeof vNode.type === 'function') {
    return processVNode(vNode.type(vNode.props));
  }

  // 배열 처리 (여러 자식 요소가 있는 경우)
  if (Array.isArray(vNode)) {
    return vNode.map(processVNode);
  }

  // 일반 요소 노드 처리
  if (typeof vNode === 'object') {
    // 자식 요소들에 대해 재귀적으로 processVNode 호출
    vNode.children = Array.isArray(vNode.children)
      ? vNode.children.map(processVNode)
      : [processVNode(vNode.children)];

    return vNode;
  }

  // 예상치 못한 타입의 경우 빈 문자열 반환
  return '';
}

function updateAttributes(element, newProps = {}, oldProps = {}) {
  // newProps가 null이면 빈 객체로 초기화
  newProps = newProps || {};

  const allProps = Object.keys({ ...oldProps, ...newProps });

  allProps.forEach((key) => {
    const oldValue = oldProps[key];
    const newValue = newProps[key];

    // 속성이 제거된 경우
    if (!(key in newProps)) {
      if (key.startsWith('on')) {
        const eventType = key.toLowerCase().slice(2);
        removeEvent(element, eventType, oldValue);
      } else {
        element.removeAttribute(key);
      }
    }
    // 새로운 속성이거나 값이 변경된 경우
    else if (oldValue !== newValue) {
      if (key === 'className') {
        element.className = newValue || '';
      } else if (key === 'style') {
        if (typeof newValue === 'string') {
          element.style.cssText = newValue;
        } else if (newValue && typeof newValue === 'object') {
          Object.keys(newValue).forEach((styleKey) => {
            if (element.style[styleKey] !== newValue[styleKey]) {
              element.style[styleKey] = newValue[styleKey];
            }
          });
        }
      } else if (key.startsWith('on')) {
        const eventType = key.toLowerCase().slice(2);
        if (oldValue) {
          removeEvent(element, eventType, oldValue);
        }
        if (newValue) {
          addEvent(element, eventType, newValue);
        }
      } else if (newValue === true) {
        element.setAttribute(key, '');
      } else if (newValue === false || newValue == null) {
        element.removeAttribute(key);
      } else {
        element.setAttribute(key, newValue);
      }
    }
  });
}

function updateElement(parentElement, newNode, oldNode, index = 0) {
  // parentElement가 없거나 유효하지 않은 경우 처리
  if (!parentElement || !(parentElement instanceof Element)) {
    return;
  }

  // 새 노드 추가
  if (!oldNode) {
    parentElement.appendChild(createElement__v2(newNode));
    return;
  }

  // 노드 제거
  if (!newNode) {
    if (parentElement.childNodes[index]) {
      parentElement.removeChild(parentElement.childNodes[index]);
    }
    return;
  }

  // 노드 교체
  if (
    typeof newNode !== typeof oldNode ||
    (typeof newNode === 'string' && newNode !== oldNode) ||
    newNode.type !== oldNode.type
  ) {
    if (parentElement.childNodes[index]) {
      parentElement.replaceChild(
        createElement__v2(newNode),
        parentElement.childNodes[index]
      );
    } else {
      parentElement.appendChild(createElement__v2(newNode));
    }
    return;
  }

  // 같은 타입의 노드 업데이트
  if (typeof newNode !== 'string') {
    const newElement = parentElement.childNodes[index];
    if (newElement) {
      updateAttributes(newElement, newNode.props, oldNode.props);

      // 자식 노드 업데이트
      const newLength = newNode.children ? newNode.children.length : 0;
      const oldLength = oldNode.children ? oldNode.children.length : 0;
      for (let i = 0; i < Math.max(newLength, oldLength); i++) {
        updateElement(
          newElement,
          newNode.children && newNode.children[i],
          oldNode.children && oldNode.children[i],
          i
        );
      }

      // 불필요한 자식 노드 제거
      while (newElement.childNodes.length > newLength) {
        newElement.removeChild(newElement.lastChild);
      }
    }
  }
}

export function renderElement(vNode, container) {
  const processedVNode = processVNode(vNode);

  if (!container._vNode) {
    // 최초 렌더링
    container.innerHTML = '';
    container.appendChild(createElement__v2(processedVNode));
  } else {
    // 리렌더링
    updateElement(container, processedVNode, container._vNode);
  }

  // 이전 vNode 저장
  container._vNode = processedVNode;

  // 이벤트 위임 설정
  setupEventListeners(container);

  // 렌더링 완료 후 사용자 정의 이벤트 발생
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('renderComplete', { detail: { container } })
    );
  }
}
