
import { addEvent, removeEvent, setupEventListeners } from './eventManager';
import { createElement__v2 } from "./createElement__v2.js";

function processVNode(vNode) {
  if (!vNode) {
    return document.createTextNode("");
  };

  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }

  if (typeof vNode.type === "function") {
    return processVNode(vNode.type(vNode.props || {}));
  }


  vNode.children.forEach(child => {
    processVNode(child);
  });

  return vNode;
}

function updateAttributes(domElement, newProps, oldProps) {
  const props = new Set();

  Object.keys(newProps).forEach(key => {
    if (key.startsWith('on')) {
      const eventName = key.slice(2).toLowerCase();
      removeEvent(domElement, eventName, oldProps[key]);
      addEvent(domElement, eventName, newProps[key]);
    } else if (key === 'className') {
      domElement.setAttribute('class', newProps[key]);
    } else {
      domElement.setAttribute(key, newProps[key]);
    }
  });
  
  Object.keys(oldProps).forEach(key => {
    if (!(key in newProps)) {
      domElement.removeAttribute(key);
    } else {
      domElement.removeAttribute(key);
    }
  });


}

function updateElement(parent, newNode, oldNode, index = 0) {
  const newChild = createElement__v2(newNode);
  const oldChild = parent.childNodes[index];
  
  if (!newNode && oldNode) {
    parent.removeChild(oldChild);
    return;
  }
  
  if (newNode && !oldNode) {
    parent.appendChild(newChild);
    return;
  }
  
  if ((typeof newNode === "string" || typeof newNode === "number") && (typeof oldNode === "string" || typeof oldNode === "number")) {
    if (newNode === oldNode) {
      return;
    }

    oldChild.textContent = newNode; 
    return;
  }

  if (newNode.type !== oldNode.type) {
    if (oldChild) {
      parent.replaceChild(newChild, oldChild);
    } else {
      parent.appendChild(newChild);
    }
    return;
  }

  if (newNode.type) {
    updateAttributes(oldChild, newNode.props || {}, oldNode.props || {});

    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;

    for (let i = newLength; i < oldLength; i++) {
      oldChild.removeChild(oldChild.childNodes[i]);
    }

    for (let i = 0; i < newLength; i++) {
      updateElement(oldChild, newNode.children[i], oldNode.children[i], i);
    }
  }
};

export function renderElement(newVNode, container) {
  if(!container){
    return;
  }

  const vNode = processVNode(newVNode);

  if (!container._oldNode) {
    container.appendChild(createElement__v2(vNode));
  } else {
    updateElement(container, vNode, container._oldNode);
  }

  // console.log(container._oldNode)
  setupEventListeners(container); 
  container._oldNode = vNode;
};
