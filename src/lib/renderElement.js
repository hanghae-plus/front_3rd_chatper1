// renderElement.js
import { addEvent, removeEvent, setupEventListeners } from "./eventManager";
import { createElement__v2 } from "./createElement__v2.js";

// TODO: processVNode 함수 구현
function processVNode(vNode) {
  // vNode를 처리하여 렌더링 가능한 형태로 변환합니다.
  // - null, undefined, boolean 값 처리
  if (!vNode) {
    return "";
  }
  // - 문자열과 숫자를 문자열로 변환
  if (typeof vNode === "string" || typeof vNode === "number") {
    return String(vNode);
  }

  if (typeof vNode.type === "function") {
    return processVNode(vNode.type(vNode.props));
  }
  // 자식 요소 재귀 처리
  vNode.children = vNode.children.map(processVNode);
  return vNode;
}

// TODO: updateAttributes 함수 구현
function updateAttributes(target, newProps, oldProps) {
  oldProps = oldProps || {};
  newProps = newProps || {};

  //이전 props에서 제거된 속성 처리
  Object.entries(oldProps).forEach(([key, value]) => {
    if (!(key in newProps)) {
      if (key.startsWith("on")) {
        const eventType = key.toLowerCase().substring(2);
        removeEvent(target, eventType, value);
      } else if (key === "className") {
        target.removeAttribute("class");
      } else {
        target.removeAttribute(key);
      }
    }
  });

  // 새로운 props의 속성 추가 또는 업데이트
  Object.entries(newProps).forEach(([key, value]) => {
    if (!(key in oldProps)) {
      if (key.startsWith("on")) {
        const eventType = key.toLowerCase().substring(2);
        addEvent(target, eventType, value);
      } else if (key === "className") {
        target.setAttribute("class", value);
      } else {
        target.setAttribute(key, value);
      }
    } else {
      if (key.startsWith("on")) {
        const eventType = key.toLowerCase().substring(2);
        removeEvent(target, eventType, value);
        addEvent(target, eventType, value);
      } else if (key === "className") {
        target.removeAttribute("class");
        target.setAttribute("class", value);
      } else {
        // target.removeAttribute(key);
        target.setAttribute(key, value);
      }
    }
  });
}

//   Object.entries(oldProps).forEach(([key, value]) => {
//     if (!(key in newProps)) {
//       if (key.startsWith("on")) {
//         const eventType = key.toLowerCase().substring(2);
//         removeEvent(target, eventType, value);
//       } else if (key === "className") {
//         target.removeAttribute("class");
//       } else {
//         target.removeAttribute(key);
//       }
//     }
//   });

//   Object.entries(newProps).forEach(([key, value]) => {
//     if (!(key in oldProps) || oldProps[key] !== value) {
//       if (key.startsWith("on")) {
//         const eventType = key.toLowerCase().substring(2);
//         if (oldProps[key]) removeEvent(target, eventType, oldProps[key]);
//         addEvent(target, eventType, value);
//       } else if (key === "className") {
//         target.setAttribute("class", value);
//       } else {
//         target.setAttribute(key, value);
//       }
//     }
//   });
// }

// TODO: updateElement 함수 구현
function updateElement(parent, newNode, oldNode, index = 0) {
  // 1. 노드 제거 (newNode가 없고 oldNode가 있는 경우)
  // TODO: oldNode만 존재하는 경우, 해당 노드를 DOM에서 제거
  if (!newNode && oldNode) {
    parent.removeChild(parent.childNodes[index]);
    return;
  }
  // 2. 새 노드 추가 (newNode가 있고 oldNode가 없는 경우)
  // TODO: newNode만 존재하는 경우, 새 노드를 생성하여 DOM에 추가
  if (newNode && !oldNode) {
    return parent.appendChild(createElement__v2(newNode));
  }
  // 3. 텍스트 노드 업데이트
  // TODO: newNode와 oldNode가 둘 다 문자열 또는 숫자인 경우
  // TODO: 내용이 다르면 텍스트 노드 업데이트
  if (typeof newNode === "string" && typeof oldNode === "string") {
    if (newNode !== oldNode) {
      parent.replaceChild(createElement__v2(newNode), parent.childNodes[index]);
    }
    return;
  }
  // 4. 노드 교체 (newNode와 oldNode의 타입이 다른 경우)
  // TODO: 타입이 다른 경우, 이전 노드를 제거하고 새 노드로 교체
  if (newNode.type !== oldNode.type) {
    return parent.replaceChild(
      createElement__v2(newNode),
      parent.childNodes[index]
    );
  }

  // 5. 같은 타입의 노드 업데이트
  // 5-1. 속성 업데이트
  // TODO: updateAttributes 함수를 호출하여 속성 업데이트
  updateAttributes(parent.childNodes[index], newNode.props, oldNode.props);

  // 5-2. 자식 노드 재귀적 업데이트
  // TODO: newNode와 oldNode의 자식 노드들을 비교하며 재귀적으로 updateElement 호출
  // HINT: 최대 자식 수를 기준으로 루프를 돌며 업데이트

  const oldNodeChildren = oldNode.children || [];
  const newNodeChildren = newNode.children || [];
  const maxLength = Math.max(oldNodeChildren.length, newNodeChildren.length);

  for (let i = 0; i < maxLength; i++) {
    updateElement(
      parent.childNodes[index],
      newNodeChildren[i],
      oldNodeChildren[i],
      i
    );
  }

  if (oldNodeChildren.length > newNodeChildren.length) {
    for (let i = newNodeChildren.length + 1; i < oldNodeChildren.length; i++) {
      parent.childNodes[index].removeChild(
        parent.childNodes[index].childNodes[i]
      );
    }
  }
}
//   if (oldNodeChildren.length > newNodeChildren.length) {
//     for (let i = newNodeChildren.length; i < oldNodeChildren.length; i++) {
//       const childNode = parentNode.childNodes[index].childNodes[i];
//       if (childNode) {
//         parentNode.childNodes[index].removeChild(childNode);
//       }
//     }
//   }
// }

//   if (oldNodeChildren.length > newNodeChildren.length) {
//     for (let i = newNodeChildren.length; i < newNodeChildren.length; i++) {
//       const childNode = parent.childNodes[index].childNodes[i];
//       if (childNode) {
//         parent.childNodes[index].removeChild(childNode);
//       }
//     }
//   }
// }

//   if (oldNodeChildren.length > newNodeChildren.length) {
//     for (let i = newNodeChildren.length; i < oldNodeChildren.length; i++) {
//       parent.removeChild(parent.childNodes[i]);
//     }
//   }
// }

export function renderElement(vNode, container) {
  if (!container) return;

  const oldNode = container._vNode;
  const newVNode = processVNode(vNode);

  if (!oldNode) {
    container.appendChild(createElement__v2(newVNode));
  } else {
    updateElement(container, newVNode, oldNode);
  }

  container._vNode = newVNode;
  setupEventListeners(container);
}
