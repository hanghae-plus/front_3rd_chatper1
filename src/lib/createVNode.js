export function createVNode(type, props, ...children) {
  console.log('children: ', children);
  console.log('props: ', props);
  console.log('type: ', type);

  return { type, props, children: children.flat(Infinity).filter(Boolean) };
}

export function Fragment({ props, ...children }) {
  return { props, ...children };
}
