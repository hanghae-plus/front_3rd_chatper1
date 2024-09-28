import { addEvent } from "./eventManager";

export function createElement__v2(vNode) {
  if (!vNode) {
    return document.createTextNode('');
  }

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(vNode);
  }

  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach(child => fragment.appendChild(createElement__v2(child)));
    return fragment;
  }

  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach(child => fragment.appendChild(createElement__v2(child)));
    return fragment;
  }


  const $el = document.createElement(vNode.type);

  Object.entries(vNode.props ?? {}).forEach(([attr, value]) => {
    if (attr.startsWith('on') && typeof value === 'function') {
      const eventType = attr.toLowerCase().slice(2);
      addEvent($el, eventType, value);
    } else if (attr === 'className') {
      $el.setAttribute('class', value);
    } else {
      $el.setAttribute(attr, value);
    }
  });

  vNode.children
    .filter(Boolean)
    .map(createElement__v2)
    .forEach(child => $el.appendChild(child));

  return $el;
}
