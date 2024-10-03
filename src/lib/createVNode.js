/**
 * 가상 노드(Virtual DOM)를 생성하는 함수입니다.
 * 
 * @param {string|function} type - DOM 요소의 타입 (예: 태그 이름) 또는 함수형 컴포넌트.
 * @param {object} [props={}] - DOM 요소에 적용할 속성 또는 컴포넌트에 전달할 props.
 * @param {...any} children - 자식 요소들, 중첩된 배열 형태도 허용.
 * @returns {object} - 가상 DOM 노드. { type, props, children } 형태의 객체로 반환.
 * 
 * 이 함수는 다음과 같은 작업을 수행합니다:
 * 1. type이 DOM 요소의 태그 이름이거나 함수형 컴포넌트인지 확인합니다.
 * 2. props는 비어 있을 경우 기본적으로 빈 객체로 설정합니다.
 * 3. 모든 자식 요소를 flat(Infinity)로 평탄화하며, falsy 값 (null, undefined, false 등)은 필터링하여 제거합니다.
 */
export function createVNode(type, props = {}, ...children) {
  // 자식 요소를 평탄화하고 falsy 값(null, undefined, false)을 제거합니다.
  const flatChildren = children.flat(Infinity).filter(Boolean);

  // 가상 DOM 노드를 반환합니다.
  return { type, props, children: flatChildren };
}