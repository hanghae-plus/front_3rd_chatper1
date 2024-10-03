import { addEvent, removeEvent, setupEventListeners } from "./eventManager";
import { createElement__v2 } from "./createElement__v2.js";

function processVNode(vNode) {
  if (!vNode) {
    return "";
  }

  if (typeof vNode === "string" || typeof vNode === "number") {
    return String(vNode);
  }

  if (typeof vNode.type === "function") {
    return processVNode(
      vNode.type({
        ...vNode.props,
        children: vNode.children,
      }),
    );
  }

  if (Array.isArray(vNode.children)) {
    vNode.children = vNode.children.map(processVNode).filter(Boolean);
  }

  return vNode;
}

function updateAttributes(element, oldProps, newProps) {
  const _oldProps = oldProps || {};
  const _newProps = newProps || {};

  Object.entries(_oldProps).map(([oldPropKey, oldPropValue]) => {
    if (oldPropKey in _newProps) return;

    if (oldPropKey.startsWith("on") && typeof oldPropValue === "function") {
      const eventType = oldPropKey.toLowerCase().substring(2);
      removeEvent(element, eventType, oldPropValue);
    } else if (oldPropKey === "className") {
      element.removeAttribute("class");
    } else {
      element.removeAttribute(oldPropKey);
    }
  });

  Object.entries(_newProps).map(([newPropKey, newPropValue]) => {
    if (newPropKey.startsWith("on") && typeof newPropValue === "function") {
      const eventType = newPropKey.toLowerCase().substring(2);
      if (oldProps[newPropKey] !== newPropValue) {
        if (oldProps[newPropKey]) {
          removeEvent(element, eventType, oldProps[newPropKey]);
        }
        addEvent(element, eventType, newPropValue);
      }
    } else if (newPropKey === "className") {
      element.setAttribute("class", newPropValue);
    } else if (newPropKey === "style") {
      Object.assign(element.style, newPropValue);
    } else {
      element.setAttribute(newPropKey, newPropValue);
    }
  });
}

function updateElement(parent, oldNode, newNode, index = 0) {
  const currentNode = parent.childNodes[index];

  if (!newNode && oldNode) {
    parent.removeChild(parent.childNodes[index]);
    return;
  }

  if (newNode && !oldNode) {
    parent.appendChild(createElement__v2(newNode));
    return;
  }

  // 3. 텍스트 노드 업데이트
  if (
    typeof newNode === "string" ||
    typeof newNode === "number" ||
    typeof oldNode === "string" ||
    typeof oldNode === "number"
  ) {
    if (newNode === oldNode) return;

    parent.replaceChild(createElement__v2(newNode), currentNode);
  }

  if (newNode.type !== oldNode.type) {
    parent.replaceChild(createElement__v2(newNode), currentNode);
    return;
  }

  updateAttributes(currentNode, oldNode.props, newNode.props);

  if (oldNode.children && newNode.children) {
    const maxChildrenLength = Math.max(oldNode.children.length, newNode.children.length);

    for (let i = 0; i < maxChildrenLength; i++) {
      updateElement(currentNode, oldNode.children[i], newNode.children[i], i);
    }

    while (currentNode.childNodes && newNode.children && currentNode.childNodes.length > newNode.children.length) {
      currentNode.removeChild(currentNode.lastChild);
    }
  }
}

export function renderElement(vNode, container) {
  console.log("container:", container);
  console.log(`JSON container: ${JSON.stringify(container, undefined, 2)}`);
  console.dir("dir container:", JSON.stringify(container, undefined, 2));
  const oldVNode = container._vNode || null;

  const newVNode = processVNode(vNode);

  if (oldVNode === null) {
    container.appendChild(createElement__v2(newVNode));
  } else {
    updateElement(container, oldVNode, newVNode);
  }

  container._vNode = newVNode;

  setupEventListeners(container);
}
