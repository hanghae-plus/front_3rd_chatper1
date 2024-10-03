// 이 함수는 createElement의 개선된 버전입니다.
// 1. falsy vNode 처리
// 2. 문자열 또는 숫자 vNode 처리
// 3. 배열 vNode 처리 (DocumentFragment 사용)
// 4. 일반 요소 vNode 처리:
//    - 요소 생성
//    - 속성 설정 (이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선)
//    - 자식 요소 추가
const events = ['onClick', 'onChange', 'onInput', 'onSubmit'];
export function createElement__v2(vNode) {
  let $el;

  if (typeof vNode === 'string') {
    $el = document.createTextNode(vNode);
    return $el;
  }
  if (Array.isArray(vNode)) {
    $el = new DocumentFragment();
    vNode.forEach(element => {
      $el.appendChild(createElement__v2(element));
    });
    return $el;
  }

  $el = document.createElement(vNode.type);

  for (let name in vNode.props) {
    let propsName = name;
    let propsValue = vNode.props[name];
    if (events.includes(name) && typeof propsValue === 'function') {
      const eventName = name.slice(2).toLocaleLowerCase();
      const eventFn = propsValue;
      $el.addEventListener(eventName, eventFn);
      continue;
    }
    if (name === 'className') {
      propsName = 'class';
    } else if (name === 'style' && typeof propsValue === 'object') {
      const styleProps = Object.entries(propsValue)
        .map(([key, value]) => `${camelToKebab(key)}: ${value}`)
        .join(';');
      propsValue = styleProps;
    }
    $el.setAttribute(propsName, propsValue);
  }

  vNode.children.forEach(child => {
    const $child = createElement__v2(child);
    $el.appendChild($child);
  });

  return $el;
}

function camelToKebab(str) {
  return str.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
}
