import { extractEventType, isBooleanProp, isEventProp, isInValidVNode, setBooleanProp, setStyleProp } from '../utils';
import { addEvent } from './eventManager';

function setProps($el, props) {
  Object.entries(props).forEach(([name, value]) => {
    if (isEventProp(name, value)) {
      return;
    }

    if (name === 'className') {
      $el.setAttribute('class', value);
    } else if (name === 'style') {
      setStyleProp($el, value);
    } else if (isBooleanProp(name, value)) {
      setBooleanProp($el, name, value);
    } else {
      $el.setAttribute(name, value);
    }
  });
}

function setEvents($el, props) {
  Object.entries(props).forEach(([name, value]) => {
    if (isEventProp(name, value)) {
      const eventType = extractEventType(name);
      addEvent($el, eventType, value);

      return;
    }
  });
}

export function createElement__v2(vNode) {
  if (isInValidVNode(vNode)) {
    return document.createTextNode('');
  }

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(vNode.toString());
  }

  if (Array.isArray(vNode)) {
    const $fragment = document.createDocumentFragment();
    $fragment.append(...vNode.map(createElement__v2));
    return $fragment;
  }

  if (typeof vNode.type === 'function') {
    return createElement__v2(vNode.type(vNode.props));
  }

  const $el = document.createElement(vNode.type);

  if (vNode.props !== null) {
    setProps($el, vNode.props);
    setEvents($el, vNode.props);
  }

  const $children = vNode.children.map(createElement__v2);
  $el.append(...$children);

  return $el;
}
