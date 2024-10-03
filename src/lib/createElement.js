export const createElement = (vNode) => {
  if (vNode === null || vNode === undefined || typeof vNode === 'boolean') {
    return document.createTextNode('');
  }

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(vNode);
  }

  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => fragment.appendChild(createElement(child)));
    return fragment;
  }

  if (typeof vNode.type === 'function') {
    return createElement(vNode.type(vNode.props));
  }

  const element = document.createElement(vNode.type);

  if (vNode.props) {
    Object.keys(vNode.props).forEach((key) => {
      const value = vNode.props[key];

      if (key.startsWith('on') && typeof value === 'function') {
        const eventType = key.slice(2).toLowerCase();
        element.addEventListener(eventType, value);
      } else if (key === 'className') {
        element.className = value;
      } else {
        element.setAttribute(key, value);
      }
    });
  }

  if (vNode.children) {
    vNode.children.forEach((child) => {
      element.appendChild(createElement(child));
    });
  }

  return element;
};
