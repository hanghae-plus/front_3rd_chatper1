import { formatVNodeAttr } from './formatVNodeAttr';
import { isPrimitiveDataType } from './isPrimitiveDataType';

export function createElement(vNode) {
  if (isPrimitiveDataType(vNode, ['undefined', 'boolean', 'null'])) return document.createTextNode('');

  if (isPrimitiveDataType(vNode, ['string', 'number'])) return document.createTextNode(String(vNode));

  if (Array.isArray(vNode)) {
    if (vNode.length === 0) return document.createTextNode('');
    const fragment = new DocumentFragment();
    vNode.forEach((child) => fragment.appendChild(createElement(child)));
    return fragment;
  }

  if (typeof vNode.type === 'function') {
    return createElement(vNode.type(vNode.props, vNode.children));
  }

  const element = document.createElement(vNode.type);

  for (const name in vNode.props) {
    formatVNodeAttr(name, vNode.props[name], {
      eventWorker: (key, value) => {
        element.addEventListener(key, value);
      },
      attributeWorker: (key, value) => {
        element.setAttribute(key, value);
      },
    });
  }

  for (const child of vNode.children) {
    element.appendChild(createElement(child));
  }

  element._vNode = vNode;
  return element;
}
