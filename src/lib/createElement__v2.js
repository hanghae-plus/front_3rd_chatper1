import { addEvent } from "./eventManager";

// TODO: createElement__v2 함수 구현
export function createElement__v2(vNode) {
  // console.log(vNode)
  
  if (!vNode) {
    return document.createTextNode("");
  }

  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }

  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();

    vNode.forEach((node) => {
      fragment.appendChild(createElement__v2(node));
    });

    return fragment;
  }

  if (typeof vNode.type === 'function') {
    const componentVNode = vNode.type(vNode.props || {});
    return createElement__v2(componentVNode);
  }

  const domElement = document.createElement(vNode.type);

  if (vNode.props) {
    Object.keys(vNode.props).forEach((key) => {
      if (key.startsWith('on')) {
        const eventName = key.slice(2).toLowerCase(); // on뒤에 나오는 string
        addEvent(domElement, eventName, vNode.props[key]);
      } else if (key === 'className') {
        domElement.setAttribute('class', vNode.props[key]);
      } else {
        domElement.setAttribute(key, vNode.props[key]);
      }
    });
  }

  vNode.children.forEach((child) => {
    domElement.appendChild(createElement__v2(child));
  });

  return domElement;
}

