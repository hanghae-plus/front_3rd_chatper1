import { isEmptyObject, isArray } from '../utils';

export function createElement(vNode) {
  // vNode가 falsy면 빈 텍스트 노드를 반환합니다.
  if (!vNode || isEmptyObject(vNode)) {
    return document.createTextNode('');
  }

  // vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(`${vNode}`);
  }

  // vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
  if (isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => {
      fragment.appendChild(createElement(child));
    });
    return fragment;
  }
  if (typeof vNode.type === 'function') {
    if (vNode.type.name === 'Fragment') {
      const fragment = document.createDocumentFragment();
      vNode.children?.forEach((child) => {
        fragment.appendChild(createElement(child));
      });
      return fragment;
    }
    return createElement(vNode.type(vNode.props || {}));
  }

  // 실제 DOM 요소를 생성
  // vNode.type에 해당하는 요소를 생성
  const element = document.createElement(vNode.type);

  // vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
  Object.entries(vNode.props || {}).forEach(([name, value]) => {
    if (name === 'className') {
      element.setAttribute('class', value);
    } else if (name.startsWith('on') && typeof value === 'function') {
      // 이벤트 리스너 추가
      const eventType = name.slice(2).toLowerCase();
      element.addEventListener(eventType, value);
    } else {
      element.setAttribute(name, value);
    }
  });

  // vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가
  vNode.children?.forEach((child) => element.appendChild(createElement(child)));

  return element;
}
