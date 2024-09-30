type VNode = {
  type: string;
  props: Record<string, any> | null;
  children: any[];
};

export function createVNode(
  type: string,
  props: Record<string, any> | null,
  ...children: any[]
): VNode {
  const filteredChildren = children.flat(Infinity).filter((v) => Boolean(v));

  return { type, props, children: filteredChildren };
}
