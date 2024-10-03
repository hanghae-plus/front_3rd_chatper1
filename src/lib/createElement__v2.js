import { addEvent } from './eventManager.js';

export function createElement__v2(vNode) {
  if (!vNode || typeof vNode === 'boolean') {
    return document.createTextNode('');
  }

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(vNode);
  }

  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();

    vNode.forEach((child) => {
      fragment.appendChild(createElement__v2(child));
    });

    return fragment;
  }
  if (typeof vNode.type === 'function') {
    return createElement__v2(vNode.type(vNode.props || {}));
  }


  const element = document.createElement(vNode.type);

  if (vNode.props !== null) {
    Object.keys(vNode.props).forEach(key => {
      if (key.startsWith('on')) {
        addEvent(element, key.slice(2).toLowerCase(), vNode.props[key]);
      } else if (key === 'className') {
        element.setAttribute('class', vNode.props[key]);
      } else {
        element.setAttribute(key, vNode.props[key]);
      }
    });
  }


  if (vNode.children) {
    vNode.children.forEach(child => element.appendChild(createElement__v2(child)));
  }

  return element;
}