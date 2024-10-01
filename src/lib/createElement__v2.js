import { addEvent } from './eventManager';
import { formatVNodeAttr } from './';

export function createElement__v2(vNode) {
  if (!vNode) return document.createTextNode('');

  if (typeof vNode === 'string' || typeof vNode === 'number') return document.createTextNode(vNode);
  if (Array.isArray(vNode)) {
    const fragment = new DocumentFragment();
    vNode.forEach((child) => fragment.appendChild(createElement__v2(child)));
    return fragment;
  }

  if (typeof vNode.type === 'function') {
    return createElement__v2(vNode.type(vNode.props, vNode.children));
  }

  const element = document.createElement(vNode.type);

  for (const name in vNode.props) {
    formatVNodeAttr(name, vNode.props[name], {
      eventWorker: (key, value) => {
        addEvent(element, key, value);
        element._vNode = vNode;
      },
      attributeWorker: (key, value) => {
        element.setAttribute(key, value);
      },
    });
  }

  for (const child of vNode.children) {
    element.appendChild(createElement__v2(child));
  }

  return element;
}
