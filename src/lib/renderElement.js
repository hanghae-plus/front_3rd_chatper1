// renderElement.js
import { addEvent, removeEvent, setupEventListeners } from './eventManager';
import { createElement__v2 } from "./createElement__v2.js";
let previousVNode = null;


// TODO: processVNode 함수 구현
function processVNode(vNode) {

  if(vNode == null || typeof vNode == 'boolean'){
    return '';
  }
  if (typeof vNode === 'string' || typeof vNode ==='number'){
    return String(vNode);
  }

  if(typeof vNode.type === 'function'){
    const props = vNode.props ||{};
    const componentResult = vNode.type(props);
    return processVNode(componentResult);
  }

  if(typeof vNode === 'object'){
    const processedChildren = Array.isArray(vNode.children)? vNode.children.map(processVNode):[];
    return {
      ...vNode,
      children:processedChildren
    };
  }
  //예상치 못한 타입의 경우, 원래 vNode를 반환
  return vNode;
}

// TODO: updateAttributes 함수 구현
function updateAttributes(element, newProps, oldProps = {}) {

  for ( const key in oldProps){
    if(newProps === null){
      return;
    }
  if(!(key in newProps)){
    if(key.startsWith('on')){
      const eventName = key.toLowerCase().substring(2);
      removeEvent(element, eventName, oldProps[key]);
    }  
    else if (key === 'className'){
      element.className = '';
    }else if(key === 'style'){
      element.removeAttribute('style');
    }else{
      element.removeAttribute(key)
    }
  }
}

  // - 새로운 props의 속성 추가 또는 업데이트
  for(const key in newProps) {
    if(oldProps[key] !== newProps[key]){
      if(key.startsWith('on')){
        const eventName = key.toLowerCase().substring(2);
        if(oldProps[key]){
          removeEvent(element,eventName,oldProps[key]);
        }
        addEvent(element, eventName, newProps[key]);
      }
        
      else if(key === 'className'){
        element.className = newProps[key];
      }else if(key === 'style'){
        if(typeof newProps[key] === 'string'){
          element.style.cssText = newProps[key];
        }else {
          for (const styleKey in newProps[key]){
            element.style[styleKey] = newProps[key][styleKey];
          }
        }
      }else if(key === 'value'){
        element.value = newProps[key];
      }else {
        if(newProps[key] === true){
          element.setAttribute(key,'');
        }else if(newProps[key] === false || newProps[key]){
          element.removeAttribute([key]);
        }else {
           element.setAttribute(key,newProps[key])
        }
      }
    }
  }

}

// TODO: updateElement 함수 구현
function updateElement(parentNode, newNode, oldNode, index = 0) {
  // 기존 자식 노드 가져오기 (없으면 undefined)
  const childNode = parentNode.childNodes[index];

  if (!newNode && oldNode && childNode) {
    parentNode.removeChild(childNode);
    return;
  }

  if (newNode && !oldNode) {
    parentNode.appendChild(createElement__v2(newNode));
    return;
  }

  if (typeof newNode === 'string' || typeof newNode === 'number') {
    if (childNode && childNode.nodeType === Node.TEXT_NODE) {
      childNode.textContent = newNode;
    } else {
      const newTextNode = document.createTextNode(String(newNode));
      if (childNode) {
        parentNode.replaceChild(newTextNode, childNode);
      } else {
        parentNode.appendChild(newTextNode);
      }
    }
    return;
  }

  if (!childNode || (newNode.type !== oldNode.type)) {
    const newElement = createElement__v2(newNode);
    if (childNode) {
      parentNode.replaceChild(newElement, childNode);
    } else {
      parentNode.appendChild(newElement);
    }
  } else {
    updateAttributes(childNode, newNode.props, oldNode.props);
    
    const newChildren = newNode.children || [];
    const oldChildren = oldNode.children || [];
    const maxLength = Math.max(newChildren.length, oldChildren.length);
    
    for (let i = 0; i < maxLength; i++) {
      updateElement(
        childNode,
        newChildren[i],
        oldChildren[i],
        i
      );
    }

    while (childNode.childNodes.length > newChildren.length) {
      childNode.removeChild(childNode.lastChild);
    }
  }
}

// TODO: renderElement 함수 구현
export function renderElement(vNode, container) {

  const processedVNode = processVNode(vNode);

  if (!previousVNode) {
    const element = createElement__v2(processedVNode);
    container.appendChild(element);
  } else {
    updateElement(container, processedVNode, previousVNode);
  }
  previousVNode = processedVNode;


  
  setupEventListeners(container);
}

