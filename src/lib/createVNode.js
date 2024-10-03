export function createVNode(type, props, ...children) {
  return { type, props, children: children.flat(Infinity).filter(Boolean) };
}

export function Fragment({ children }) {
  return children;
}
