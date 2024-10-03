// createVNode 함수 구현
// 1. type, props, ...children을 매개변수로 받는 함수를 작성하세요.
// 2. 반환값은 { type, props, children } 형태의 객체여야 합니다.
// 3. children은 평탄화(flat)되어야 하며, falsy 값은 필터링되어야 합니다.
// 4. Infinity를 사용하여 모든 깊이의 배열을 평탄화하세요.
import { eventMap } from "./eventManager";

export function createVNode(type, props, ...children) {
  const flattedChildren = children.flat(Infinity);
  const truthyChildren = flattedChildren.filter((node) => node);
  return { type, props, children: truthyChildren };
}

export function elementToVNode(element) {
  // DOM 요소의 타입을 가져옵니다.
  const { tagName, attributes, childNodes } = element;

  // Virtual DOM 노드의 기본 구조 생성
  const vNode = {
    type: tagName.toLowerCase(), // HTML 태그를 소문자로 변환
    props: {},
    children: []
  };

  // DOM 요소의 속성을 vNode의 props로 추가
  for (const attr of attributes) {
    vNode.props[attr.name] = attr.value;
  }

  // 이벤트 리스너를 props로 변환
  eventMap.forEach((handlers, eventType) => {
    if (handlers.has(element)) {
      const handler = handlers.get(element);

      // 이벤트 타입을 camelCase로 변환하여 props에 추가
      const eventName = `on${capitalize(eventType)}`;
      vNode.props[eventName] = handler;
    }
  });

  // 자식 노드를 재귀적으로 처리하여 children 배열에 추가
  for (const child of childNodes) {
    if (child.nodeType === Node.TEXT_NODE) {
      // 텍스트 노드인 경우, 문자열로 추가
      vNode.children.push(child.nodeValue);
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      // 요소 노드인 경우, 재귀적으로 elementToVNode 호출
      vNode.children.push(elementToVNode(child));
    }
  }

  return createVNode(vNode.type, vNode.props, vNode.children);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
