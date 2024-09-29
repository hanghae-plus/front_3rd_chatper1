/**
  * @function createVNode
  * @terms 가상 DOM 노드(VNode) 생성
  * @desc 타입(type), 속성(props), 그리고 자식 요소들(...children)을 받아서 가상 DOM 노드를 생성
  * 반환되는 객체는 'type', 'props', 그리고 'children' 속성을 포함
  * 'children'은 모든 중첩된 배열을 평탄화(flat)하고 falsy 값(null, undefined, false, 0, '')을 제거하여 구성
*/

export function createVNode(type, props = {}, ...children) {
  return { type, props, children: children.flat(Infinity).filter(Boolean) };
}
