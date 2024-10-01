export function createElement(vNode) {
  if (!vNode) return document.createTextNode('');

  //TODO: type이 number이면서 Number.isNaN()일 경우 체크
  if (typeof vNode === 'string' || typeof vNode === 'number') return document.createTextNode(vNode);
  if (Array.isArray(vNode)) {
    const fragment = new DocumentFragment();
    vNode.forEach((child) => fragment.appendChild(createElement(child)));
    return fragment;
  }

  if (typeof vNode.type === 'function') {
    return createElement(vNode.type(vNode.props, vNode.children));
  }

  // Good
  // if (Boolean(vNode) || Number.isNaN(vNode)) return document.createTextNode('');

  const element = document.createElement(vNode.type);

  for (const key in vNode.props) {
    const value = vNode.props[key];

    if (key.startsWith('on') && typeof value === 'function') {
      element.addEventListener(key.slice(2).toLowerCase(), value, false);
    } else {
      if (key === 'style') {
        const ObjStyleToStringStyle = Object.entries(value)
          .reduce((acc, [key, value]) => {
            const _key = key.replaceAll(/([A-Z])/g, '-$1').toLowerCase();
            const _value = typeof value === 'string' ? value : `${value}px`;
            return acc + `${_key}: ${_value}; `;
          }, '')
          .trim();
        element.setAttribute(key, ObjStyleToStringStyle);
      } else {
        const _key = key === 'className' ? 'class' : key;
        element.setAttribute(_key, value);
      }
    }
  }

  for (const child of vNode.children) {
    element.appendChild(createElement(child));
  }

  return element;
}
