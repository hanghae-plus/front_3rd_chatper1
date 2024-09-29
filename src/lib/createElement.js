import { EVENT_LISTENER_ATTRIBUTE_PREFIX } from '../constants';

export function createElement(vNode) {
  // 1. vNode가 falsy면 빈 텍스트 노드를 반환합니다.
  if (!vNode && vNode !== 0) {
    return document.createTextNode('');
  }

  // 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(String(vNode));
  }

  const { type: vNodeType, props, children } = vNode;

  // 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((node) => fragment.appendChild(createElement(node)));

    return fragment;
  }

  // 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
  if (typeof vNodeType === 'function') {
    const component = vNodeType;
    return createElement(component(props || {}));
  }

  // 5. 위 경우가 아니면 실제 DOM 요소를 생성합니다:
  //    - vNode.type에 해당하는 요소를 생성
  //    - vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
  //    - vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가

  const element = document.createElement(vNodeType);

  props &&
    Object.entries(props).forEach(([name, value]) => {
      const isEventAttribute = EVENT_LISTENER_ATTRIBUTE_PREFIX.test(name);

      if (isEventAttribute) {
        const eventName = name.match(EVENT_LISTENER_ATTRIBUTE_PREFIX)[1];
        const eventTarget = eventName.toLowerCase();
        const handler = value;

        element.addEventListener(eventTarget, handler);
        return;
      }

      // TODO: 질문하기! setAttribute vs property 설정
      element.setAttribute(name, value);
      element[name] = value;
    });

  children.forEach((node) => node && element.appendChild(createElement(node)));

  return element;
}
