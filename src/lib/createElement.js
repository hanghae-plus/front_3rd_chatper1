import { createVNode } from './createVNode';

export function createElement(vNode) {
  /**
 * @function vNode가 falsy면 빈 텍스트 노드를 반환하는 기능
 * @desc vNode가 null, undefined 또는 false와 같은 falsy 값인 경우, 빈 텍스트 노드를 반환
 */

  if (!vNode) {
    return document.createTextNode('');
  }

  return createDOMElement(vNode);
}
