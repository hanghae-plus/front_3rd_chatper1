import { formatVNodeAttr } from './formatVNodeAttr';

export function createElement(vNode) {
  if (vNode === null || vNode === undefined) return document.createTextNode('');

  if (typeof vNode === 'boolean') return document.createTextNode('');

  //TODO: type이 number이면서 Number.isNaN()일 경우 체크
  if (typeof vNode === 'string' || typeof vNode === 'number') return document.createTextNode(vNode);
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

  for (const key in vNode.props) {
    const [name, value] = formatVNodeAttr(key, vNode.props[key]);

    if (key.startsWith('on') && typeof value === 'function') {
      element.addEventListener(name, value);
    } else {
      element.setAttribute(name, value);
    }
  }

  for (const child of vNode.children) {
    element.appendChild(createElement(child));
  }

  return element;
}
