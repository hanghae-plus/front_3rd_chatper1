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

  if (['string', 'number', 'bigint'].includes(typeof vNode)) {
    $el = document.createTextNode(vNode);
    return $el;
  }

  if ([null, false].includes(vNode)) {
    $el = document.createTextNode('');
    return $el;
  }

  if (Array.isArray(vNode)) {
    $el = new DocumentFragment();
    vNode.forEach(element => {
      $el.appendChild(createElement__v2(element));
    });
    return $el;
  }

  if (typeof vNode.type === 'function') {
    $el = createElement__v2(vNode.type(vNode.props));
    return $el;
  }

  $el = document.createElement(vNode.type);

  for (let name in vNode.props) {
    let propsName = name;
    if (events.includes(name) && typeof vNode.props[name] === 'function') {
      const eventName = name.slice(2).toLocaleLowerCase();
      const eventFn = vNode.props[name];
      $el.addEventListener(eventName, eventFn);
      continue;
    }
    if (name === 'className') {
      propsName = 'class';
    }
    $el.setAttribute(propsName, vNode.props[name]);
  }

  vNode.children.forEach(child => {
    const $child = createElement__v2(child);
    $el.appendChild($child);
  });

  return $el;
}
