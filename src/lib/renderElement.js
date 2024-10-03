// renderElement.js
import { addEvent, removeEvent, setupEventListeners } from './eventManager';
import { createElement__v2 } from './createElement__v2.js';

function processVNode(vNode) {
  if ([null, undefined].includes(vNode) || typeof vNode === 'boolean') {
    return '';
  }
  if (['string', 'number', 'bigint'].includes(typeof vNode)) {
    return String(vNode);
  }
  if (typeof vNode.type === 'function') {
    return processVNode(vNode.type(vNode.props));
  }
  return {
    type: vNode.type,
    props: vNode.props || {},
    children: (vNode.children || []).map(child => processVNode(child)),
  };
}

function updateAttributes(vNode, newProps, oldProps) {
  for (let name in oldProps) {
    if (!Object.hasOwn(newProps, name)) {
      vNode.removeAttribute(name);

      if (name.startsWith('on')) {
        removeEvent(vNode, name.slice(2).toLowerCase(), oldProps[name]);
      }
    }
    if (!Object.hasOwn(newProps, 'className')) {
      vNode.removeAttribute('class');
    }
  }
  for (let name in newProps) {
    if (!Object.hasOwn(oldProps, name) || oldProps[name] !== newProps[name]) {
      if (name === 'className') {
        vNode.setAttribute('class', newProps[name]);
      } else if (name === 'style') {
        const styleValue = Object.entries(newProps[name])
          .map(([key, value]) => `${camelToKebab(key)}:${value}`)
          .join(';');
        vNode.setAttribute(name, styleValue);
      } else if (name.startsWith('on')) {
        addEvent(vNode, name.slice(2).toLowerCase());
      } else {
        vNode.setAttribute(name, newProps[name]);
      }
    }
  }
}

function updateElement(parent, newNode, oldNode, key) {
  if (!newNode && oldNode) {
    parent.removeChild(parent.childNodes[key]);
    return;
  }

  if (newNode && !oldNode) {
    parent.appendChild(createElement__v2(newNode));
    return;
  }

  if (typeof newNode === 'string' && typeof oldNode === 'string' && newNode !== oldNode) {
    parent.innerHTML = newNode;
    return;
  }

  if (newNode.type !== oldNode.type) {
    parent.replaceChild(createElement__v2(newNode), parent.childNodes[key]);
    return;
  }

  updateAttributes(parent.childNodes[key], newNode.props, oldNode.props);

  if (newNode.children && oldNode.children) {
    const maxLength = Math.max(newNode.children.length, oldNode.children.length);
    for (let i = 0; i < maxLength; i++) {
      updateElement(parent.childNodes[key], newNode.children[i], oldNode.children[i], i);
    }
  }
}

let vNodeMap = new Map();

export function renderElement(vNode, $root) {
  vNodeMap.set('newNode', processVNode(vNode));

  if ($root.childNodes.length === 0) {
    vNodeMap.set('oldNode', processVNode(vNode));
    $root.appendChild(createElement__v2(vNodeMap.get('newNode')));
    return;
  }
  updateElement($root, vNodeMap.get('newNode'), vNodeMap.get('oldNode'), 0);
  vNodeMap.set('oldNode', vNodeMap.get('newNode'));
}

function camelToKebab(str) {
  return str.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
}
