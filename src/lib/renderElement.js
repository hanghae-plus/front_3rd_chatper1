// renderElement.js
import { addEvent, removeEvent, setupEventListeners } from "./eventManager";
import { createElement__v2 } from "./createElement__v2.js";

function processVNode(vNode) {
  if (vNode == null || typeof vNode === "boolean") {
    return "";
  }

  if (typeof vNode === "number") {
    return vNode.toString();
  }

  if (typeof vNode === "string") {
    return vNode;
  }

  if (typeof vNode.type === "function") {
    return processVNode(vNode.type(vNode.props));
  }

  if (Array.isArray(vNode)) {
    return vNode.map(processVNode);
  }

  vNode.children = Array.isArray(vNode.children)
    ? vNode.children.map(processVNode)
    : [processVNode(vNode.children)];

  return vNode;
}

function updateAttributes(domElement, newProps, oldProps = {}) {
  newProps = newProps || {};
  oldProps = oldProps || {};
  for (const [name, value] of Object.entries(oldProps)) {
    console.log(
      `Old value for ${name}: ${oldProps[name]}, New value: ${value}`
    );

    if (!(name in newProps)) {
      if (name.startsWith("on")) {
        const eventType = name.toLowerCase().substring(2);
        console.log(
          `Calling removeEvent for event: ${eventType}, handler: ${value}`
        );
        removeEvent(domElement, eventType, value);
      } else if (name === "className") {
        domElement.className = "";
      } else if (name === "style") {
        domElement.style = "";
      } else {
        domElement.removeAttribute(name);
      }
    }
  }

  for (const [name, value] of Object.entries(newProps)) {
    if (oldProps[name] !== value) {
      if (name.startsWith("on")) {
        const eventType = name.toLowerCase().substring(2);
        if (oldProps[name]) {
          removeEvent(domElement, eventType, oldProps[name]);
        }
        if (value) {
          addEvent(domElement, eventType, value);
        }
      } else if (name === "className") {
        domElement.className = value;
      } else if (name === "style") {
        if (typeof value === "object") {
          Object.assign(domElement.style, value);
        } else {
          domElement.style.cssText = value;
        }
      } else {
        domElement.setAttribute(name, value);
      }
    }
  }
}

function updateElement(parentElement, newNode, oldNode, index = 0) {
  // 현재 자식 노드 가져오기
  const oldChildNode = parentElement.childNodes[index];

  // 1. 노드 제거
  if (!newNode && oldNode) {
    if (oldChildNode) {
      parentElement.removeChild(oldChildNode);
    }
    return;
  }

  // 2. 새 노드 추가
  if (newNode && !oldNode) {
    parentElement.appendChild(createElement__v2(newNode));
    return;
  }

  // 3. 텍스트 노드 업데이트
  if (typeof newNode === "string" || typeof newNode === "number") {
    if (oldNode !== newNode) {
      const newTextNode = document.createTextNode(newNode);
      if (oldChildNode) {
        parentElement.replaceChild(newTextNode, oldChildNode);
      } else {
        parentElement.appendChild(newTextNode);
      }
    }
    return;
  }

  // 4. 노드 교체
  if (newNode.type !== oldNode.type) {
    if (oldChildNode) {
      parentElement.replaceChild(createElement__v2(newNode), oldChildNode);
    } else {
      parentElement.appendChild(createElement__v2(newNode));
    }
    return;
  }

  // 5. 같은 타입의 노드 업데이트
  const domElement = oldChildNode;

  // 5-1. 속성 업데이트
  updateAttributes(domElement, newNode.props, oldNode.props);

  // 5-2. 자식 노드 재귀적 업데이트
  const maxLength = Math.max(newNode.children.length, oldNode.children.length);

  for (let i = 0; i < maxLength; i++) {
    updateElement(domElement, newNode.children[i], oldNode.children[i], i);
  }

  // 5-3. 불필요한 자식 노드 제거
  while (domElement.childNodes.length > newNode.children.length) {
    const lastChild = domElement.lastChild;
    if (lastChild) {
      domElement.removeChild(lastChild);
    }
  }
}
export function renderElement(vNode, container) {
  const processedVNode = processVNode(vNode);
  const oldVNode = container._vNode;

  if (!oldVNode) {
    // 최초 렌더링
    const newElement = createElement__v2(processedVNode);
    container.appendChild(newElement);
  } else {
    // 업데이트 렌더링
    updateElement(container, processedVNode, oldVNode);
  }

  // 현재 vNode를 container에 저장
  container._vNode = processedVNode;

  // 이벤트 위임 설정
  setupEventListeners(container);
}
