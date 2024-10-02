import { addEvent, removeEvent, setupEventListeners } from "./eventManager";
import { createElement__v2 } from "./createElement__v2.js";

function processVNode(vNode) {
  if (vNode === null || vNode === undefined || typeof vNode === "boolean") {
    return {}; // ? 어떻게 처리하면 좋을까???
  }
  if (typeof vNode === "string" || typeof vNode === "number") {
    return String(vNode);
  }
  if (typeof vNode.type === "function") {
    const component = vNode.type({ ...vNode.props, children: vNode.children });
    return processVNode(component);
  }
  if (vNode?.children) {
    vNode.children = processVNode(vNode.children);
    return vNode;
  }
  if (Array.isArray(vNode)) {
    return vNode.map(processVNode);
  }
}

function updateAttributes(element, oldVNode, newVNode) {
  const allProps = { ...oldVNode.props, ...newVNode.props };

  const handleKey = (key, addHandler, removeHandler, updateHandler) => {
    const oldVal = oldVNode.props && key in oldVNode.props ? oldVNode.props[key] : null;
    const newVal = oldVNode.props && key in newVNode.props ? newVNode.props[key] : null;
    if ((!oldVNode.props && newVNode.props) || (!oldVal && newVal)) {
      console.log("추가:", key);
      addHandler();
    } else if ((oldVNode.props && !newVNode.props) || (oldVal && !newVal)) {
      console.log("삭제:", key);
      removeHandler();
    } else if (oldVal !== newVal) {
      console.log("변경:", key);
      updateHandler();
    }
  };

  Object.entries(allProps).forEach(([key, value]) => {
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      if (key === "className") {
        handleKey(
          key,
          () => element.classList.add(...value.split(" ")),
          () => (element.classList = ""),
          () => {
            element.classList = "";
            element.classList.add(...value.split(" "));
          }
        );
      } else {
        handleKey(
          key,
          () => element.setAttribute(key, value),
          () => element.removeAttribute(key),
          () => element.setAttribute(key, value)
        );
      }
    } else if (typeof value === "function" && key.toLowerCase() in element) {
      const eventType = key.toLowerCase().replace("on", "");
      handleKey(
        key,
        () => element.addEventListener(eventType, value), // TODO: 변경 필요
        () => element.removeEventListener(eventType),
        () => {
          element.removeEventListener(eventType);
          element.addEventListener(eventType, value);
        }
      );
    } else if (typeof value === "object") {
      handleKey(
        key,
        () =>
          Object.entries(value).forEach(([_key, _value]) => {
            element[key][_key] = _value;
          }),
        () => delete element[key],
        () => {
          delete element[key];
          Object.entries(value).forEach(([_key, _value]) => {
            element[key][_key] = _value;
          });
        }
      );
    } else {
      handleKey(
        key,
        () => (element[key] = value),
        () => delete element[key],
        () => (element[key] = value)
      );
    }
  });
}

function updateElement(parentElement, oldElement, oldVNode, newVNode) {
  if (oldVNode && !newVNode) {
    oldElement.remove();
  } else if (!oldVNode && newVNode) {
    const newElement = createElement__v2(newVNode);
    parentElement.appendChild(newElement);
  } else if (
    (typeof oldVNode === "string" && typeof newVNode === "string") ||
    (typeof oldVNode === "number" && typeof newVNode === "number")
  ) {
    if (oldVNode !== newVNode) oldElement.textContent = newVNode;
  } else if (oldVNode.type !== newVNode.type) {
    const newElement = createElement__v2(newVNode);
    oldElement.replaceWith(newElement);
  } else if (oldVNode.type === newVNode.type) {
    updateAttributes(oldElement, oldVNode, newVNode);

    const maxChildren = Math.max(oldVNode.children.length, newVNode.children.length);
    for (let i = 0; i < maxChildren; i++) {
      updateElement(
        oldElement,
        oldElement.childNodes[i],
        oldVNode.children[i],
        newVNode.children[i]
      );
    }

    if (oldVNode.children.length > newVNode.children.length) {
      for (let i = maxChildren; i < oldVNode.children.length; i++) {
        updateElement(oldElement, oldElement.childNodes[i], oldVNode.children[i], null);
      }
    }
  }
}

export function renderElement(vNode, container) {
  const oldVNode = container._vNode;
  const newVNode = processVNode(vNode);
  if (!oldVNode) {
    const firstElement = createElement__v2(newVNode);
    if (container.hasChildNodes()) {
      container.firstChild.replaceWith(firstElement);
    } else {
      container.appendChild(firstElement);
    }
  } else {
    updateElement(container, container.firstChild, oldVNode, newVNode);
  }
  container._vNode = newVNode;

  setupEventListeners(container);
}
