export function createElement__v2(vNode) {
  if (!vNode) {
    return document.createTextNode("");
  }
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  }
  if (Array.isArray(vNode)) {
    const fragment = new DocumentFragment();
    const components = vNode.map((child) => createElement__v2(child));
    fragment.append(...components);

    return fragment;
  }
  const node = document.createElement(vNode.type);
  if (vNode.props) {
    Object.entries(vNode.props).forEach(([key, value]) => {
      if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        if (key === "className") {
          node.classList.add(...value.split(" "));
        } else {
          node.setAttribute(key, value);
        }
      } else if (typeof value === "function" && key.toLowerCase() in node) {
        const eventType = key.toLowerCase().replace("on", "");
        node.addEventListener(eventType, value); // TODO: eventManager로 바꿔야함
      } else if (typeof value === "object") {
        Object.entries(value).forEach(([_key, _value]) => {
          node[key][_key] = _value;
        });
      } else {
        node[key] = value;
      }
    });
  }
  if (vNode.children) {
    const child = createElement__v2(vNode.children);
    node.appendChild(child);
  }

  return node;
}
