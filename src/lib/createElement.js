export function createElement(vNode) {
  if (vNode === null || vNode === undefined || typeof vNode === 'boolean') {
    return document.createTextNode('');
  }

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(vNode);
  }

  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach(child => fragment.appendChild(createElement(child)));
    return fragment;
  }

  if (typeof vNode.type === 'function') {
    const result = vNode.type(vNode.props);
    return createElement(result);
  }

  const $el = document.createElement(vNode.type);

  Object.entries(vNode.props ?? {})
    .forEach(([attr, value]) => {
      if (attr.startsWith('on') && typeof value === 'function') {
        $el.addEventListener(attr.toLowerCase().slice(2), value);
      } else if (attr === 'className') {
        $el.className = value;
      } else {
        $el.setAttribute(attr, value)
      }
    });

  vNode.children
    .filter(Boolean)
    .map(createElement)
    .forEach(child => $el.appendChild(child));

  return $el;
}
