import { addEvent, removeEvent, setupEventListeners } from "./eventManager";
import { createElement__v2 } from "./createElement__v2.js";
import { elementToVNode } from "./createVNode.js";
import { isNullish, isTextNode } from "../utils/typeUtils.js";

function processVNode(vNode) {
  // 자기 자신에 대한 처리
  if (vNode === null || vNode === undefined || typeof vNode === "boolean") {
    return null;
  }
  if (typeof vNode === "string" || typeof vNode === "number") {
    return String(vNode);
  }
  if (typeof vNode.type === "function") {
    return processVNode(vNode.type(vNode.props));
  }

  // 자식 노드에 대한 처리
  if (vNode.children.length > 0) {
    const { type, props } = vNode;
    const processedChildren = vNode.children.map((child) =>
      processVNode(child)
    );
    return { type, props, children: processedChildren };
  }

  return vNode;
}
function updateElement(parentNode, newNode, oldNode, index = 0) {
  if (!oldNode && newNode) {
    parentNode.appendChild(createElement__v2(newNode));
  } else if (!newNode && oldNode) {
    parentNode.removeChild(parentNode.childNodes[index]);
  } else if (isTextNode(newNode) && isTextNode(oldNode)) {
    if (String(newNode) !== String(oldNode)) {
      parentNode.childNodes[index].nodeValue = String(newNode);
    }
  } else if (newNode.type !== oldNode.type) {
    parentNode.replaceChild(
      createElement__v2(newNode),
      parentNode.childNodes[index]
    );
  } else {
    updateAttributes(
      parentNode.childNodes[index],
      newNode.props,
      oldNode.props
    );
    const newChildren = newNode.children ?? [];
    const oldChildren = oldNode.children ?? [];
    const maxLength = Math.max(newChildren.length, oldChildren.length);
    for (let i = 0; i < maxLength; i++) {
      updateElement(
        parentNode.childNodes[index],
        newChildren[i],
        oldChildren[i],
        i
      );
    }

    // new에 없는 자식 노드 제거
    if (oldChildren.length > newChildren.length) {
      for (let i = newChildren.length; i < oldChildren.length; i++) {
        const childNode = parentNode.childNodes[index].childNodes[i];
        if (childNode) {
          parentNode.childNodes[index].removeChild(childNode);
        }
      }
    }
  }
}

export function renderElement(vNode, container) {
  if (!container) return;
  if (container.hasChildNodes()) {
    const newNode = processVNode(vNode);
    const oldNode = processVNode(elementToVNode(container.childNodes[0]));
    updateElement(container, newNode, oldNode);
  } else {
    container.appendChild(createElement__v2(vNode));
  }
  // 이벤트 위임 설정
  setupEventListeners(container);
}
