// TODO: createElement 함수 구현
// 1. vNode가 falsy면 빈 텍스트 노드를 반환합니다.
// 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
// 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
// 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
// 5. 위 경우가 아니면 실제 DOM 요소를 생성합니다:
//    - vNode.type에 해당하는 요소를 생성
//    - vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
//    - vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가

export function isInValidVNode(vNode) {
  return (
    vNode === undefined || vNode === null || typeof vNode === 'boolean'
    // (typeof vNode === 'number' && Number.isNaN(vNode))
  );
}

function isEventProp(name, value) {
  return name.startsWith('on') && typeof value === 'function';
}

function setEventProp($el, eventName, handler) {
  eventName = eventName.slice(2).toLowerCase();
  $el.addEventListener(eventName, handler);
}

// data-checked={true}일 경우 HTML에 속성이 추가될 때
// data-checked="true"로 변환 됨
function isBooleanProp(name, value) {
  return typeof value === 'boolean' && !name.startsWith('data-');
}

function setBooleanProp($el, name, value) {
  if (value) {
    $el.setAttribute(name, value);
    $el[name] = true;
  } else {
    $el[name] = false;
  }
}

function setProps($el, props) {
  Object.entries(props).forEach(([name, value]) => {
    if (name === 'className') {
      $el.setAttribute('class', value);
    } else if (isBooleanProp(name, value)) {
      setBooleanProp($el, name, value);
    } else if (isEventProp(name, value)) {
      setEventProp($el, name, value);
    } else {
      $el.setAttribute(name, value);
    }
  });
}

/**
 *
 * @param {VNode | VNode[]} vNode
 * @returns
 */
export function createElement(vNode) {
  if (isInValidVNode(vNode)) {
    return document.createTextNode('');
  }

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(vNode.toString());
  }

  if (Array.isArray(vNode)) {
    const $el = document.createDocumentFragment();
    $el.append(...vNode.map(createElement));
    return $el;
  }

  if (typeof vNode.type === 'function') {
    return createElement(vNode.type(vNode.props));
  }

  const $el = document.createElement(vNode.type);

  if (vNode.props !== null) {
    setProps($el, vNode.props);
  }

  $el.append(...vNode.children.map(createElement));

  return $el;
}
