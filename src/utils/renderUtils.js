import { updateElement } from "../lib";

export function updateTextNode(parent, newNode, oldNode, existingDOMElement) {
  if (newNode !== oldNode) {
    const newTextNode = document.createTextNode(newNode);
    if (existingDOMElement) {
      parent.replaceChild(newTextNode, existingDOMElement);
    } else {
      parent.appendChild(newTextNode);
    }
  }
}

export function updateComponentNode(
  parent,
  newNode,
  oldNode,
  existingDOMElement,
  index
) {
  const props = newNode.props || {};
  const renderedNewElement = newNode.type(props);
  newNode._rendered = renderedNewElement;

  if (
    !oldNode ||
    typeof oldNode.type !== "function" ||
    oldNode.type !== newNode.type
  ) {
    const newEl = createElement__v2(renderedNewElement);
    if (existingDOMElement) {
      parent.replaceChild(newEl, existingDOMElement);
    } else {
      parent.appendChild(newEl);
    }
    return;
  }

  const oldProps = oldNode.props || {};
  const propsChanged = havePropsChanged(props, oldProps);

  if (propsChanged || !oldNode._rendered) {
    updateElement(parent, renderedNewElement, oldNode._rendered, index);
  }
}

export function havePropsChanged(newProps, oldProps) {
  return (
    Object.keys(newProps).some((key) => newProps[key] !== oldProps[key]) ||
    Object.keys(oldProps).some((key) => newProps[key] !== oldProps[key])
  );
}

export function updateChildren(parentNode, newChildren = [], oldChildren = []) {
  const maxLength = Math.max(newChildren.length, oldChildren.length);
  for (let i = 0; i < maxLength; i++) {
    updateElement(parentNode, newChildren[i], oldChildren[i], i);
  }

  while (parentNode.childNodes.length > newChildren.length) {
    parentNode.removeChild(parentNode.lastChild);
  }
}
