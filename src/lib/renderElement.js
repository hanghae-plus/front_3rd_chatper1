import { addEvent, removeEvent, setupEventListeners } from "./eventManager";
import { createElement__v2 } from "./createElement__v2.js";
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

function updateAttributes(element, newProps, oldProps) {
  // old엔 있고 new엔 없는 경우 삭제
  for (const propName in oldProps) {
    if (isNullish(newProps) || !Object.keys(newProps).includes(propName)) {
      if (propName.startsWith("on")) {
        const eventType = propName.slice(2).toLowerCase();
        removeEvent(element, eventType);
      } else if (propName.includes("class")) {
        element.className = "";
      } else if (propName === "style") {
        element.style.cssText = "";
      } else {
        element.removeAttribute(propName);
      }
    }
  }

  // 추가 or 유지된 속성 추가
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

let oldVNode = null;
export function renderElement(vNode, container) {
  if (!container) return;

  const newVNode = processVNode(vNode);

  if (!container.innerHTML) {
    container.appendChild(createElement__v2(vNode));
  } else {
    updateElement(container, newVNode, oldVNode);
  }

  oldVNode = newVNode;
  setupEventListeners(container);
}
