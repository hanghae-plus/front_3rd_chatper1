
import { addEvent, removeEvent, setupEventListeners } from './eventManager';
import { createElement__v2 } from "./createElement__v2.js";


function processVNode(vNode) {
  if (!vNode) return document.createTextNode("");

  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }

  if (typeof vNode.type === "function") {
    return processVNode(vNode.type(vNode.props));
  }

  const element = document.createElement(vNode.type);

  if (vNode.props) {
    Object.keys(vNode.props).forEach(prop => {
      if (prop.startsWith("on")) {
        const event = prop.toLowerCase().substring(2); //on뒤에 나오는 string
        element.addEventListener(event, vNode.props[prop]);
      } else if (prop === "className") {
        element.setAttribute("class", vNode.props[prop]);
      } else {
        element.setAttribute(prop, vNode.props[prop]);
      }
    });
  }

  
  vNode.children.forEach(child => {
    element.appendChild(processVNode(child));
  });

  return element;
}


function updateAttributes(domElement, newProps, oldProps = {}) {
  
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
    }
  });
}


function updateElement(parent, newNode, oldNode, index = 0) {
  const oldChild = parent.childNodes[index];

  
  if (!newNode && oldNode) {
    parent.removeChild(oldChild);
    return;
  }

  
  if (newNode && !oldNode) {
    parent.appendChild(processVNode(newNode));
    return;
  }

  
  if (typeof newNode === "string" || typeof newNode === "number") {
    if (typeof oldNode === "string" || typeof oldNode === "number") {
      if (newNode !== oldNode) {
        oldChild.textContent = newNode; 
      }
    } else {
      parent.replaceChild(document.createTextNode(newNode), oldChild);
    }
    return;
  }

  
  if (newNode.type !== oldNode.type) {
    parent.replaceChild(processVNode(newNode), oldChild);
    return;
  }

  
  if (newNode.type) {
    updateAttributes(oldChild, newNode.props, oldNode.props);

    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;

    
    for (let i = newLength; i < oldLength; i++) {
      oldChild.removeChild(oldChild.childNodes[i]);
    }

    
    for (let i = 0; i < newLength; i++) {
      updateElement(oldChild, newNode.children[i], oldNode.children[i], i);
    }
  }
}




export function renderElement(newVNode, container, oldVNode = null) {
  
  if (!oldVNode) {
    container.appendChild(processVNode(newVNode));
  } else {
    
    updateElement(container, newVNode, oldVNode);
  }

  
  setupEventListeners(container); 
}