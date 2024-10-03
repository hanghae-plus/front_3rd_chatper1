import { isBooleanProp, isEventProp, isInValidVNode, setBooleanProp, setEventProp, setStyleProp } from '../utils';

function setProps($el, props) {
  Object.entries(props).forEach(([name, value]) => {
    if (name === 'className') {
      $el.setAttribute('class', value);
    } else if (name === 'style') {
      setStyleProp($el, value);
    } else if (isBooleanProp(name, value)) {
      setBooleanProp($el, name, value);
    } else if (isEventProp(name, value)) {
      setEventProp($el, name, value);
    } else {
      $el.setAttribute(name, value);
    }
  });
}

export function createElement__v2(vNode) {
  // 이 함수는 createElement의 개선된 버전입니다.
  // 1. falsy vNode 처리
  // 2. 문자열 또는 숫자 vNode 처리
  // 3. 배열 vNode 처리 (DocumentFragment 사용)
  // 4. 일반 요소 vNode 처리:
  //    - 요소 생성
  //    - 속성 설정 (이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선)
  //    - 자식 요소 추가
  if (isInValidVNode(vNode)) {
    return document.createTextNode('');
  }

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(vNode.toString());
  }

  if (Array.isArray(vNode)) {
    const $fragment = document.createDocumentFragment();
    $fragment.append(...vNode.map(createElement__v2));
    return $fragment;
  }

  if (typeof vNode.type === 'function') {
    return createElement__v2(vNode.type(vNode.props));
  }

  const $el = document.createElement(vNode.type);

  // TODO: vNode.props이 undefined일 경우에 대한 처리도 해줘야 하나?
  if (vNode.props !== null) {
    setProps($el, vNode.props);
  }

  const $children = vNode.children.map(createElement__v2);
  $el.append(...$children);

  return $el;
}
