import { deepFlat } from "./deepFlat";

export function createVNode(type, props, ...children) {
  return { type, props, children: deepFlat([children]).filter(Boolean) };
}
