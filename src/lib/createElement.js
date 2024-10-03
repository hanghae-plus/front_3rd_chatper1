export function createElement(vNode) {
if(!vNode ) {
  return document.createTextNode('');
}
if(typeof vNode === 'string'|| typeof vNode === 'number'){
  return document.createTextNode(vNode);
}
if(Array.isArray(vNode)){

  const fragment = document.createDocumentFragment();
  vNode.forEach(child => fragment.appendChild(createElement(child)));

  return fragment;
}
if (typeof vNode.type === 'function') {
  return createElement(vNode.type(vNode.props));
}


const element = document.createElement(vNode.type);
if (vNode.props) {
  Object.entries(vNode.props).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key.startsWith('on') && typeof value === 'function') {
      element.addEventListener(key.toLowerCase().slice(2), value);
    } else {
      element.setAttribute(key, value);
    }
  });
}
if (vNode.children) {
  const childrenFragment = createElement(vNode.children);
  element.appendChild(childrenFragment);
}

  return element
}

