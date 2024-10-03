// TODO: createElement 함수 구현
export function createElement(vNode) {
  if (!vNode) {
    return document.createTextNode("");
  }

  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }

  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();

    vNode.forEach((node) => {
      fragment.appendChild(createElement(node));
    });

    return fragment;
  }

  if (typeof vNode.type === 'function') {
    const componentVNode = vNode.type(vNode.props || {});
    return createElement(componentVNode);
  }

  const domElement = document.createElement(vNode.type);

  if (vNode.props) {
    Object.keys(vNode.props).forEach((key) => {
      if (key.startsWith('on')) {
        const eventName = key.slice(2).toLowerCase(); // on뒤에 나오는 string
        domElement.addEventListener(eventName, vNode.props[key]);
      } else if (key === 'className') {
        domElement.setAttribute('class', vNode.props[key]);
      } else {
        domElement.setAttribute(key, vNode.props[key]);
      }
    });
  }

  vNode.children.forEach((child) => {
    domElement.appendChild(createElement(child));
  });

  return domElement;
}

