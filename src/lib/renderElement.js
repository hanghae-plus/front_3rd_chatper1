// renderElement.js
import { addEvent, removeEvent, setupEventListeners } from "./eventManager";
import { createElement__v2 } from "./createElement__v2.js";

// 가상 노드를 처리하는 함수
function processVNode(vNode) {
  // 빈 노드 처리
  if (!vNode) {
    return document.createTextNode(""); // 빈 텍스트 노드 반환
  }

  // 문자열 또는 숫자 노드 처리
  if (typeof vNode === "string" || typeof vNode === "number") {
    return vNode; // 텍스트 노드로 변환
  }

  // 함수형 노드 컴포넌트 처리
  if (typeof vNode.type === "function") {
    const componentVNode = vNode.type(vNode.props); // 해당 함수를 호출
    return processVNode(componentVNode); // 그 결과로 processVNode 재귀 호출
  }

  // 자식 노드를 재귀적으로 처리
  const processedChildren = (vNode.children || []).map(processVNode);

  return {
    type: vNode.type,
    props: vNode.props || {},
    children: processedChildren,
  };
}

// DOM 속성을 업데이트하는 함수
function updateAttributes($element, oldProps = {}, newProps = {}) {
  // 기존 속성 제거
  for (const key in oldProps) {
    if (!(key in newProps)) {
      if (key.startsWith("on")) {
        const eventType = key.slice(2).toLowerCase();
        removeEvent($element, eventType, oldProps[key]); // 이벤트 리스너 제거
      } else if (key === "className") {
        $element.className = ""; // className 제거
      } else {
        $element.removeAttribute(key); // 일반 속성 제거
      }
    }
  }

  // 새로운 속성 추가
  for (const [key, value] of Object.entries(newProps)) {
    if (key === "children") continue; // 자식 노드는 무시

    if (key.startsWith("on")) {
      const eventType = key.slice(2).toLowerCase();
      addEvent($element, eventType, value); // 새로운 이벤트 리스너 추가
    } else if (key === "className") {
      $element.className = value; // className 설정
    } else {
      $element.setAttribute(key, value); // 일반 속성 설정
    }
  }
}

// DOM 요소 업데이트 함수
function updateElement(container, oldNode, newNode, index = 0) {
  const oldElement = container.childNodes[index];

  // 노드 제거
  if (!newNode && oldNode) {
    if (oldElement) container.removeChild(oldElement); // oldElement 제거
    return;
  }

  // 새 노드 추가
  if (newNode && !oldNode) {
    const newElement = createElement__v2(newNode);
    if (container.childNodes[index]) {
      container.insertBefore(newElement, container.childNodes[index]); // index 위치에 새 노드 추가
    } else {
      container.appendChild(newElement); // container의 끝에 추가
    }
    return;
  }

  // 텍스트 노드 업데이트
  if (
    (typeof newNode === "string" || typeof newNode === "number") &&
    (typeof oldNode === "string" || typeof oldNode === "number")
  ) {
    if (oldElement.textContent !== newNode) {
      oldElement.textContent = newNode; // 텍스트 내용 업데이트
    }
    return;
  }

  // 노드 교체
  if (oldNode.type !== newNode.type) {
    const newElement = createElement__v2(newNode);
    if (oldElement) {
      container.replaceChild(newElement, oldElement); // oldElement를 newElement로 교체
    } else {
      container.appendChild(newElement); // container의 끝에 추가
    }
    return;
  }

  // 속성 업데이트
  updateAttributes(oldElement, oldNode.props || {}, newNode.props || {});

  // 자식 노드 업데이트
  const oldChildren = oldNode.children || [];
  const newChildren = newNode.children || [];
  const maxChildrenLength = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < maxChildrenLength; i++) {
    updateElement(oldElement, oldChildren[i], newChildren[i], i); // 자식 노드 재귀 업데이트
  }

  // 불필요한 자식 노드 제거
  while (oldElement.childNodes.length > newChildren.length) {
    oldElement.removeChild(oldElement.lastChild); // 남은 자식 노드 제거
  }
}

// 최종 렌더링 함수
export function renderElement(vNode, container) {
  if (!container) return; // container가 없으면 종료

  const newNode = processVNode(vNode); // 가상 노드를 처리
  if (container?._oldNode) {
    updateElement(container, container._oldNode, newNode); // 기존 노드 업데이트
  } else {
    const $element = createElement__v2(newNode); // 새 요소 생성
    container.appendChild($element); // container에 추가
  }
  container._oldNode = newNode; // 현재 노드를 저장

  // 이벤트 위임 설정
  setupEventListeners(container);
}
