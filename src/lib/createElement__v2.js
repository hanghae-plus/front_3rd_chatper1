import { addEvent } from "./eventManager";

export function createElement__v2(vNode) {

if(!vNode ) {
  return document.createTextNode('');
}
if(typeof vNode === 'string'|| typeof vNode === 'number'){
  return document.createTextNode(vNode);
}
if(Array.isArray(vNode)){

  const fragment = document.createDocumentFragment();
  vNode.forEach(child => fragment.appendChild(createElement__v2(child)));

  return fragment;
}
if (typeof vNode.type === 'function') {
  return createElement__v2(vNode.type(vNode.props));
}


const element = document.createElement(vNode.type);
if (vNode.props) {
  Object.entries(vNode.props).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key.startsWith('on') && typeof value === 'function') {
      // element.addEventListener(key.toLowerCase().slice(2), value);
      // 이벤트 위임 방식으로 변경
      const event = key.toLowerCase().substring(2)
      addEvent(element, event, value)
    } else {
      element.setAttribute(key, value);
    }
  });
}
if (vNode.children) {
  vNode.children.forEach((child)=>{
    element.appendChild(createElement__v2(child));

  })
}

  return element
}

