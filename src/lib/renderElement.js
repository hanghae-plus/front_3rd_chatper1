// renderElement.js
import { addEvent, removeEvent, setupEventListeners } from "./eventManager";
import { createElement__v2 } from "./createElement__v2.js";

// // TODO: processVNode 함수 구현
// function processVNode() {
//   // vNode를 처리하여 렌더링 가능한 형태로 변환합니다.
//   // - null, undefined, boolean 값 처리
//   // - 문자열과 숫자를 문자열로 변환
//   // - 함수형 컴포넌트 처리 <---- 이게 제일 중요합니다.
//   // - 자식 요소들에 대해 재귀적으로 processVNode 호출
// }

export function processVNode(vNode) {
  if (vNode == null || typeof vNode === "boolean") {
    return null;
  }

  if (typeof vNode === "string" || typeof vNode === "number") {
    return String(vNode);
  }

  if (typeof vNode.type === "function") {
    const props = vNode.props || {};
    const childVNode = vNode.type(props);
    return processVNode(childVNode);
  }

  const processedChildren = (vNode.children || []).map(processVNode);

  return {
    ...vNode,
    children: processedChildren,
  };
}

// // TODO: updateAttributes 함수 구현
// function updateAttributes(element, newProps) {
//   const oldProps = element.attributes;

//   // 기존 속성 중 더 이상 없는 속성 제거
//   for (const { name } of oldProps) {
//     if (!(name in newProps)) {
//       element.removeAttribute(name);
//     }
//   }

//   // 새로운 속성 추가 또는 업데이트
//   for (const [key, value] of Object.entries(newProps)) {
//     if (key.startsWith('on')) {
//       // 이벤트 리스너일 경우
//       const eventType = key.slice(2).toLowerCase();
//       addEvent(element, eventType, value);
//     } else if (key === 'className') {
//       element.setAttribute('class', value);
//     } else {
//       element.setAttribute(key, value);
//     }
//   }

//   // DOM 요소의 속성을 업데이트합니다.
//   // - 이전 props에서 제거된 속성 처리
//   // - 새로운 props의 속성 추가 또는 업데이트
//   // - 이벤트 리스너, className, style 등 특별한 경우 처리
//   //   <이벤트 리스너 처리>
//   //     - TODO: 'on'으로 시작하는 속성을 이벤트 리스너로 처리
//   //     - 주의: 직접 addEventListener를 사용하지 않고, eventManager의 addEvent와 removeEvent 함수를 사용하세요.
//   //     - 이는 이벤트 위임을 통해 효율적으로 이벤트를 관리하기 위함입니다.
// }

function updateAttributes(element, newProps = {}, oldProps = {}) {
  // // 이전 속성 중 새로운 속성에 없는 것들 제거
  // for (const [key, value] of Object.entries(oldProps)) {
  //   if (!(key in newProps)) {
  //     if (key.startsWith("on")) {
  //       const eventType = key.slice(2).toLowerCase();
  //       removeEvent(element, eventType, value);
  //       delete element[`__${key}`];
  //     } else {
  //       element.removeAttribute(key);
  //     }
  //   }
  // }

  // // 새로운 속성 추가 또는 업데이트
  // for (const [key, value] of Object.entries(newProps)) {
  //   if (key.startsWith("on")) {
  //     const eventType = key.slice(2).toLowerCase();
  //     if (oldProps[key] !== value) {
  //       if (oldProps[key]) {
  //         removeEvent(element, eventType, oldProps[key]);
  //       }
  //       addEvent(element, eventType, value);
  //       element[`__${key}`] = value;
  //     }
  //   } else if (key === "className") {
  //     element.setAttribute("class", value);
  //   } else if (key === "style") {
  //     Object.assign(element.style, value);
  //   } else {
  //     element.setAttribute(key, value);
  //   }
  // }
  // 이전 props의 이벤트 핸들러 제거
  console.log("entries(oldProps)", Object.entries(oldProps));
  for (const [key, value] of Object.entries(oldProps)) {
    if (key.startsWith("on") && typeof value === "function") {
      const eventType = key.slice(2).toLowerCase();
      removeEvent(element, eventType, value);
    }
  }
  console.log("entries(newProps)", Object.entries(newProps));
  // 새로운 props의 이벤트 핸들러 추가
  for (const [key, value] of Object.entries(newProps)) {
    if (key.startsWith("on") && typeof value === "function") {
      const eventType = key.slice(2).toLowerCase();
      addEvent(element, eventType, value);
    } else if (key === "className") {
      element.setAttribute("class", value);
    } else if (key !== "children") {
      element.setAttribute(key, value);
    }
  }
}

// TODO: updateElement 함수 구현
function updateElement(container, oldNode, newNode, index = 0) {
  // 1. 노드 제거 (newNode가 없고 oldNode가 있는 경우)
  if (!newNode) {
    if (oldNode && container.childNodes[index]) {
      container.removeChild(container.childNodes[index]);
    }
    return;
  }

  // 2. 새 노드 추가 (newNode가 있고 oldNode가 없는 경우)
  if (!oldNode) {
    const newElement = createElement__v2(newNode);
    if (container.childNodes.length > index) {
      container.insertBefore(newElement, container.childNodes[index]);
    } else {
      container.appendChild(newElement);
    }
    return;
  }

  // 3. 텍스트 노드 업데이트
  if (typeof newNode === "string" || typeof newNode === "number") {
    if (oldNode.nodeType === Node.TEXT_NODE) {
      if (oldNode.nodeValue !== newNode) {
        oldNode.nodeValue = newNode;
      }
    } else {
      container.replaceChild(document.createTextNode(newNode), oldNode);
    }
    return;
  }

  // 4. 노드 교체 (newNode와 oldNode의 타입이 다른 경우)
  if (oldNode.nodeName.toLowerCase() !== (newNode.type || "").toLowerCase()) {
    const newElement = createElement__v2(newNode);
    container.replaceChild(newElement, oldNode);
    return;
  }

  // 5. 같은 타입의 노드 업데이트
  // 5-1. 속성 업데이트

  updateAttributes(oldNode, newNode.props || {}, oldNode.props || {});

  // 5-2. 자식 노드 재귀적 업데이트
  const oldChildren = Array.from(oldNode.childNodes);
  const newChildren = newNode.children || [];
  const maxLength = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < maxLength; i++) {
    updateElement(oldNode, oldChildren[i], newChildren[i], i);
  }

  // 5-3. 불필요한 자식 노드 제거
  while (oldNode.childNodes.length > newChildren.length) {
    oldNode.removeChild(oldNode.lastChild);
  }
}

// TODO: renderElement 함수 구현
export function renderElement(vNode, container) {
  // 최상위 수준의 렌더링 함수입니다.
  // - 이전 vNode와 새로운 vNode를 비교하여 업데이트
  // - 최초 렌더링과 업데이트 렌더링 처리
  // 이벤트 위임 설정
  // TODO: 렌더링이 완료된 후 setupEventListeners 함수를 호출하세요.
  // 이는 루트 컨테이너에 이벤트 위임을 설정하여 모든 하위 요소의 이벤트를 효율적으로 관리합니다.

  vNode = processVNode(vNode);

  console.log("Rendering vNode:", vNode);

  const oldNode = container.firstChild;

  console.log("oldNode:", oldNode);

  if (oldNode) {
    updateElement(container, oldNode, vNode, 0);
  } else {
    const newElement = createElement__v2(vNode);
    console.log("newElement:", newElement);
    container.appendChild(newElement);
  }

  // 이벤트 위임 설정
  setupEventListeners(container);
}
