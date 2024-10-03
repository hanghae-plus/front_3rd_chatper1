import { addEvent } from './eventManager';

export function createElement__v2(vNode) {
  // 이 함수는 createElement의 개선된 버전입니다.
  // 1. falsy vNode 처리
  // 2. 문자열 또는 숫자 vNode 처리
  // 3. 배열 vNode 처리 (DocumentFragment 사용)
  // 4. 일반 요소 vNode 처리:
  //    - 요소 생성
  //    - 속성 설정 (이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선)
  //    - 자식 요소 추가
  if (!vNode && vNode !== 0) {
    return createTextNode('');
  }

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return createTextNode(String(vNode));
  }

  if (Array.isArray(vNode)) {
    return createFragment(vNode);
  }

  if (typeof vNode.type === 'function') {
    return createElement__v2(vNode.type(vNode.props));
  }

  const element = document.createElement(vNode.type);
  setProps(element, vNode.props);
  appendChildren(element, vNode.children);

  return element;
}

const createTextNode = (text) => document.createTextNode(text);

const createFragment = (vNodes) => {
  const newFragment = document.createDocumentFragment();
  vNodes.forEach((child) => newFragment.appendChild(createElement__v2(child)));
  return newFragment;
};

const createEventListener = (element, key, value) => {
  const eventName = key.replace(/^on/, '').toLowerCase();
  addEvent(element, eventName, value);
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
  children.map(createElement__v2).forEach((child) => {
    element.appendChild(child);
  });
};
