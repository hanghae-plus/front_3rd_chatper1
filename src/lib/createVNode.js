export const createVNode = (type, props, ...children) => {
  return {
    type,
    props,
    children: children.flat(Infinity).filter((child) => !!child),
  };
};
