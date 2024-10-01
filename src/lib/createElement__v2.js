import { addEvent } from './eventManager';
import { formatVNodeAttr } from './formatVNodeAttr';

export function createElement__v2(vNode) {
  if (!vNode) return document.createTextNode('');

  //TODO: type이 number이면서 Number.isNaN()일 경우 체크
  if (typeof vNode === 'string' || typeof vNode === 'number') return document.createTextNode(vNode);
  if (Array.isArray(vNode)) {
    const fragment = new DocumentFragment();
    vNode.forEach((child) => fragment.appendChild(createElement__v2(child)));
    return fragment;
  }

  if (typeof vNode.type === 'function') {
    return createElement__v2(vNode.type(vNode.props, vNode.children));
  }

  // Good
  // if (Boolean(vNode) || Number.isNaN(vNode)) return document.createTextNode('');

  const element = document.createElement(vNode.type);

  for (const key in vNode.props) {
    const [name, value] = formatVNodeAttr(key, vNode.props[key]);

    if (key.startsWith('on') && typeof value === 'function') {
      addEvent(element, name, value);
      element._vNode = vNode;
    } else {
      element.setAttribute(name, value);
    }
  }

  for (const child of vNode.children) {
    element.appendChild(createElement__v2(child));
  }

  return element;
}
