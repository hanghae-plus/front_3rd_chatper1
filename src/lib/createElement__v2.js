// TODO: 이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선
// 이 함수는 createElement의 개선된 버전입니다.

export function createElement__v2(vNode) {
  if (!vNode) {
    return document.createTextNode("");
  }
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(String(vNode));
  }
  if (Array.isArray(vNode)) {
    const fragment = new DocumentFragment();
    const components = vNode.map((child) => createElement(child));
    fragment.append(...components);

    return fragment;
  }
  if (typeof vNode.type === "function") {
    const component = vNode.type({ ...vNode.props, children: vNode.children });
    return createElement(component);
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
        node.addEventListener(eventType, value);
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
    const child = createElement(vNode.children);
    node.appendChild(child);
  }
  return node;
}
