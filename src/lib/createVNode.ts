export type VNodeType = Function | keyof HTMLElementTagNameMap;
export type VNodeProps = Record<string, any> | null;
export type VNodeChild = VNodeElement | string;

export type VNodeElement = {
  type: VNodeType;
  props: VNodeProps;
  children: VNodeChild[];
};

export type VNode = VNodeChild | number;

/**
 * 주어진 타입, 속성, 자식 요소들로 가상 DOM 노드(VNode)를 생성합니다.
 */
export function createVNode(
  type: VNodeType,
  props: VNodeProps,
  ...children: VNodeChild[]
): VNode {
  const filteredChildren = children.flat(Infinity).filter((v) => Boolean(v));

  return { type, props, children: filteredChildren };
}
