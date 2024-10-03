import { addEvent } from './eventManager';
import { formatVNodeAttr, isPrimitiveDataType } from './';

export function createElement__v2(vNode) {
  if (isPrimitiveDataType(vNode, ['undefined', 'boolean', 'null'])) return document.createTextNode('');

  if (isPrimitiveDataType(vNode, ['string', 'number'])) return document.createTextNode(String(vNode));

  if (Array.isArray(vNode)) {
    if (vNode.length === 0) return document.createTextNode('');
    const fragment = new DocumentFragment();
    vNode.forEach((child) => fragment.appendChild(createElement__v2(child)));
    return fragment;
  }

  const element = document.createElement(vNode.type);

  for (const name in vNode.props) {
    formatVNodeAttr(name, vNode.props[name], {
      eventWorker: (key, value) => {
        addEvent(element, key, value);
      },
      attributeWorker: (key, value) => {
        element.setAttribute(key, value);
      },
    });
  }

  for (const child of vNode.children) {
    element.appendChild(createElement__v2(child));
  }

  element._vNode = vNode;
  return element;
}
