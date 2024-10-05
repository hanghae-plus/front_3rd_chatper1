export function createVNode(type, props, ...children) {
  const fChildren = children.flat(Infinity).filter((child) => child);
  return { type, props, children: fChildren };
}
