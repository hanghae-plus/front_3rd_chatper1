import { isBooleanProp, isEventProp, isInValidVNode, setBooleanProp, setEventProp, setStyleProp } from '../utils';

function setProps($el, props) {
  Object.entries(props).forEach(([name, value]) => {
    if (name === 'className') {
      $el.setAttribute('class', value);
    } else if (name === 'style') {
      setStyleProp($el, value);
    } else if (isBooleanProp(name, value)) {
      setBooleanProp($el, name, value);
    } else if (isEventProp(name, value)) {
      setEventProp($el, name, value);
    } else {
      $el.setAttribute(name, value);
    }
  });
}

/**
 *
 * @param {VNode | VNode[]} vNode
 * @returns
 */
export function createElement(vNode) {
  if (isInValidVNode(vNode)) {
    return document.createTextNode('');
  }

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(vNode.toString());
  }

  if (Array.isArray(vNode)) {
    const $fragment = document.createDocumentFragment();
    $fragment.append(...vNode.map(createElement));
    return $fragment;
  }

  if (typeof vNode.type === 'function') {
    return createElement(vNode.type(vNode.props));
  }

  const $el = document.createElement(vNode.type);

  if (vNode.props !== null) {
    setProps($el, vNode.props);
  }

  const $children = vNode.children.map(createElement);
  $el.append(...$children);

  return $el;
}
