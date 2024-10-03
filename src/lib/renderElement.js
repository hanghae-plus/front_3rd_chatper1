import { addEvent, removeEvent, setupEventListeners } from "./eventManager";
import { createElement__v2 } from "./createElement__v2.js";
import { elementToVNode } from "./createVNode.js";

// processVNode 함수 구현
function processVNode(vNode) {
  // 1. null, undefined, boolean 값 처리
  if (vNode === null || vNode === undefined || typeof vNode === "boolean") {
    return null;
  }

  // 2. 문자열과 숫자를 문자열로 변환
  if (typeof vNode === "string" || typeof vNode === "number") {
    return String(vNode);
  }

  // 3. 함수형 컴포넌트 처리
  if (typeof vNode.type === "function") {
    return processVNode(vNode.type(vNode.props));
  }

  // 4. 자식 요소들에 대해 재귀적으로 processVNode 호출
  if (vNode.children.length > 0) {
    const { type, props } = vNode;
    const processedChildren = vNode.children.map((child) =>
      processVNode(child)
    );
    return { type, props, children: processedChildren };
  }

  return vNode;
}

// updateAttributes 함수 구현
function updateAttributes(element, oldProps, newProps) {
  // 1. 이전 props에서 제거된 속성 처리
  for (const key in oldProps) {
    if (!newProps || !Object.keys(newProps).includes(key)) {
      if (key.startsWith("on")) {
        const eventType = key.slice(2).toLowerCase();
        // removeEvent(element, eventType, oldProps[key]);
        removeEvent(element, eventType);
      } else if (key.includes("class")) {
        element.className = "";
      } else if (key === "style") {
        element.style.cssText = "";
      } else {
        element.removeAttribute(key);
      }
    }
  }

  // 2. 새로운 props의 속성 추가 및 업데이트
  for (const key in newProps) {
    if (key.startsWith("on")) {
      const eventType = key.slice(2).toLowerCase();
      addEvent(element, eventType, newProps[key]);
    } else if (key === "className") {
      element.className = newProps[key];
    } else if (key === "style") {
      element.style.cssText = newProps[key];
    } else {
      element.setAttribute(key, newProps[key]);
    }
  }
}

// updateElement 함수 구현
function updateElement(parent, newNode, oldNode, index = 0) {
  if (!oldNode && newNode) {
    // 1. oldNode가 없고, newNode만 있으면, 새 노드 추가
    parent.appendChild(createElement__v2(newNode));
  } else if (!newNode && oldNode) {
    // 2. newNode가 없고, oldNode만 있으면, 노드 제거
    parent.removeChild(parent.childNodes[index]);
  } else if (
    (typeof newNode === "string" || typeof newNode === "number") &&
    (typeof oldNode === "string" || typeof oldNode === "number")
  ) {
    // 3. 텍스트 노드 업데이트
    if (String(newNode) !== String(oldNode)) {
      parent.childNodes[index].nodeValue = String(newNode);
    }
  } else if (newNode.type !== oldNode.type) {
    // 4. 노드 교체
    parent.replaceChild(createElement__v2(newNode), parent.childNodes[index]);
  } else {
    // 5. 같은 타입의 노드 업데이트
    updateAttributes(parent.childNodes[index], oldNode.props, newNode.props);

    // 5-2. 자식 노드 재귀적 업데이트
    const newChildren = newNode.children || [];
    const oldChildren = oldNode.children || [];
    const maxLength = Math.max(newChildren.length, oldChildren.length);

    for (let i = 0; i < maxLength; i++) {
      updateElement(
        parent.childNodes[index],
        newChildren[i],
        oldChildren[i],
        i
      );
    }

    // 5-3. 불필요한 자식 노드 제거
    if (oldChildren.length > newChildren.length) {
      for (let i = newChildren.length; i < oldChildren.length; i++) {
        const childNode = parent.childNodes[index].childNodes[i];
        if (childNode) {
          parent.childNodes[index].removeChild(childNode);
        }
      }
    }
  }
}

// renderElement 함수 구현
export function renderElement(vNode, container) {
  const processedVNode = processVNode(vNode);

  if (!container.innerHTML) {
    container.appendChild(createElement__v2(vNode));
  } else {
    const oldNode = elementToVNode(container.childNodes[0]);
    updateElement(container, processedVNode, oldNode);
  }

  // 이벤트 위임 설정
  setupEventListeners(container);
}
