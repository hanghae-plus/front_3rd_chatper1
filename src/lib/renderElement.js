// renderElement.js
import { addEvent, removeEvent, setupEventListeners } from "./eventManager";
import { createElement__v2 } from "./createElement__v2.js";

// processVNode 함수 구현
// vNode를 처리하여 렌더링 가능한 형태로 변환합니다.
function processVNode(vNode) {
  // - null, undefined, boolean 값 처리
  if (!vNode || typeof vNode === "boolean") {
    return document.createTextNode("");
  }

  // - 문자열과 숫자를 문자열로 변환
  if (typeof vNode === "string" || typeof vNode === "number") {
    return String(vNode);
  }

  const { type, props, children = [] } = vNode;
  // - 함수형 컴포넌트 처리
  if (typeof type === "function") {
    const childVNode = type(props);
    return processVNode(childVNode);
  }

  // - 자식 요소들에 대해 재귀적으로 processVNode 호출
  return {
    ...vNode,
    children: children.map((child) => processVNode(child)).filter(Boolean),
  };
}

// updateAttributes 함수 구현
// - 새로운 props의 속성 추가 또는 업데이트
// - 이벤트 리스너, className, style 등 특별한 경우 처리
function updateAttributes(target, newProps = {}, oldProps = {}) {
  // 새로운 속성 추가 및 업데이트
  for (const [attr, value] of Object.entries(newProps)) {
    if (attr.startsWith("on") && typeof value === "function") {
      const eventType = attr.slice(2).toLowerCase();

      if (value !== oldProps[attr]) {
        // 기존 이벤트 제거 후 새 이벤트 추가
        removeEvent(target, eventType, oldProps[attr]);
      }
      addEvent(target, eventType, value);
    } else if (attr === "className") {
      target.setAttribute("class", value);
    } else if (attr === "style") {
      Object.assign(target.style, value); // 스타일 객체 병합
    } else {
      target.setAttribute(attr, value);
    }
  }

  // 제거된 속성 처리
  for (const [attr, value] of Object.entries(oldProps)) {
    if (!(attr in newProps)) {
      if (attr.startsWith("on") && typeof value === "function") {
        const eventType = attr.slice(2).toLowerCase();
        removeEvent(target, eventType, value);
      } else if (attr === "className") {
        target.removeAttribute("class");
      } else {
        target.removeAttribute(attr);
      }
    }
  }
}

// : updateElement 함수 구현
function updateElement(parent, newNode, oldNode, index = 0) {
  // 1. 노드 제거 (newNode가 없고 oldNode가 있는 경우)
  // oldNode만 존재하는 경우, 해당 노드를 DOM에서 제거
  if (!newNode && oldNode) {
    parent.removeChild(parent.childNodes[index]);
    return;
  }

  // 2. 새 노드 추가 (newNode가 있고 oldNode가 없는 경우)
  // newNode만 존재하는 경우, 새 노드를 생성하여 DOM에 추가
  if (newNode && !oldNode) {
    parent.appendChild(createElement__v2(newNode));
    return;
  }

  // 3. 텍스트 노드 업데이트
  // newNode와 oldNode가 둘 다 문자열 또는 숫자인 경우
  const isTextNode = (node) =>
    typeof node === "string" || typeof node === "number";

  if (isTextNode(newNode) && isTextNode(oldNode)) {
    // 내용이 다르면 텍스트 노드 업데이트
    if (newNode !== oldNode) {
      const textNode = document.createTextNode(newNode.toString());
      // 부모 노드에서 기존 텍스트 노드를 교체
      parent.replaceChild(textNode, parent.childNodes[index]);
    }
    return;
  }

  // 4. 노드 교체 (newNode와 oldNode의 타입이 다른 경우)
  // 타입이 다른 경우, 이전 노드를 제거하고 새 노드로 교체
  if (newNode.type !== oldNode.type) {
    parent.replaceChild(createElement__v2(newNode), parent.childNodes[index]);
    return;
  }

  // 5. 같은 타입의 노드 업데이트
  // 5-1. 속성 업데이트
  // updateAttributes 함수를 호출하여 속성 업데이트
  updateAttributes(
    parent.childNodes[index],
    newNode.props || {},
    oldNode.props || {}
  );

  // 5-2. 자식 노드 재귀적 업데이트
  // newNode와 oldNode의 자식 노드들을 비교하며 재귀적으로 updateElement 호출
  const newNodeLength = newNode.children.length;
  const oldNodeLength = oldNode.children.length;

  const maxLength = Math.max(newNodeLength, oldNodeLength);
  for (let i = 0; i < maxLength; i++) {
    updateElement(
      parent.childNodes[index],
      newNode.children[i],
      oldNode.children[i],
      i
    );
  }

  // 5-3. 불필요한 자식 노드 제거
  // 불필요한 자식 노드 제거
  while (parent.childNodes[index].childNodes.length > newNode.children.length) {
    removeChild(parentElement.childNodes[index].lastChild);
  }
}

// renderElement 함수 구현
// 최상위 수준의 렌더링 함수입니다.
const nodeMap = new Map();
export function renderElement(vNode, container) {
  const prevVNode = nodeMap.get(container);
  const newVNode = processVNode(vNode);

  if (!prevVNode) {
    container.appendChild(createElement__v2(newVNode));
  } else {
    updateElement(container, newVNode, prevVNode);
  }
  setupEventListeners(container);
  nodeMap.set(container, newVNode);
}
