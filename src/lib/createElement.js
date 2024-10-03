// TODO: createElement 함수 구현
// 1. vNode가 falsy면 빈 텍스트 노드를 반환합니다.
// 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
// 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
// 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
// 5. 위 경우가 아니면 실제 DOM 요소를 생성합니다:
//    - vNode.type에 해당하는 요소를 생성
//    - vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
//    - vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가

import { isArray, isFunction, isNumber, isString } from '../utils';

export function createElement(vNode) {
  if (!vNode && vNode !== 0) {
    //  null undefined false true 에 대해서만 빈 텍스트 노드로 처리
    return createTextNode('');
  }

  if (isString(vNode) || isNumber(vNode)) {
    return createTextNode(String(vNode));
  }

  if (isArray(vNode)) {
    return createFragment(vNode);
  }

  if (isFunction(vNode.type)) {
    return createElement(vNode.type(vNode.props));
  }

  const element = document.createElement(vNode.type);
  setProps(element, vNode.props);
  appendChildren(element, vNode.children);

  return element;
}

const createTextNode = (text) => document.createTextNode(text);

const createFragment = (vNodes) => {
  const newFragment = document.createDocumentFragment();
  vNodes.forEach((child) => newFragment.appendChild(createElement(child)));
  return newFragment;
};

const createEventListener = (element, key, value) => {
  const eventName = key.replace(/^on/, '').toLowerCase();
  element.addEventListener(eventName, value);
};

const setAttribute = (element, key, value) => {
  if (key === 'className') {
    element.className = value;
  } else {
    element.setAttribute(key, value);
  }
};

const setProps = (element, props) => {
  Object.entries(props || {}).forEach(([key, value]) => {
    if (key.startsWith('on')) {
      createEventListener(element, key, value);
    } else {
      setAttribute(element, key, value);
    }
  });
};

const appendChildren = (element, children) => {
  children.map(createElement).forEach((child) => {
    element.appendChild(child);
  });
};
