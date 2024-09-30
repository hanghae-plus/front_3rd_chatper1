// TODO: createElement 함수 구현
// 1. vNode가 falsy면 빈 텍스트 노드를 반환합니다.
// 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
// 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
// 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
// 5. 위 경우가 아니면 실제 DOM 요소를 생성합니다:
//    - vNode.type에 해당하는 요소를 생성
//    - vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
//    - vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가

const events = ['onClick', 'onChange', 'onInput', 'onSubmit'];

export function createElement(vNode) {
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
      $el.appendChild(createElement(element));
    });
    return $el;
  }

  if (typeof vNode.type === 'function') {
    const $child = vNode.type(vNode.props);
    $el = createElement({ type: $child.type, props: $child.props, children: $child.children });
    return $el;
  }

  $el = document.createElement(vNode.type);

  for (let name in vNode.props) {
    let propsName = name;
    if (name === 'className') {
      propsName = 'class';
    }
    if (events.includes(name) && typeof vNode.props[name] === 'function') {
      const eventName = name.charAt(2).toLocaleLowerCase() + name.slice(3);
      $el.addEventListener(eventName, vNode.props[name]);
    }
    $el.setAttribute(propsName, vNode.props[name]);
  }

  vNode.children
    .filter(child => child !== undefined)
    .forEach(child => {
      const $child = createElement(child);
      $el.appendChild($child);
    });

  return $el;
}
