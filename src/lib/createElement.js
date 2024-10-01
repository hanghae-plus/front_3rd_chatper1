// TODO: createElement 함수 구현
// 1. vNode가 falsy면 빈 텍스트 노드를 반환합니다.
// 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
// 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
// 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
// 5. 위 경우가 아니면 실제 DOM 요소를 생성합니다:
//    - vNode.type에 해당하는 요소를 생성
//    - vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
//    - vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가

// 배열을 입력받아 DocumentFragment를 생성하는 함수
function createFragmentFromArray(array) {
  // DocumentFragment 생성
  const fragment = document.createDocumentFragment();

  // 배열의 각 요소를 순회하며 fragment에 추가
  array.forEach((item) => {
    const $el = createElement(item);
    fragment.appendChild($el);
  });

  return fragment;
}

export function createElement(vNode) {
  // 여기에 구현하세요
  if (vNode === undefined) return '';
  if (Array.isArray(vNode)) return createFragmentFromArray(vNode);

  if (vNode?.type === undefined || vNode === null || vNode === false) {
    return document.createTextNode(vNode ? vNode.toString() : '');
  }
  if (typeof vNode.type === 'function') {
    return createElement(vNode.type(vNode.props, vNode.children));
  }

  const $el = document.createElement(vNode.type);

  Object.entries(vNode.props || {})
    .filter(([_attr, value]) => value)
    .forEach(([attr, value]) => {
      if (attr === 'className') {
        attr = 'class';
      }
      if (attr.startsWith('on')) {
        $el.addEventListener(attr.slice(2).toLowerCase(), value);
      }

      return $el.setAttribute(attr, value);
    });

  try {
    vNode.children.map(createElement).forEach((child) => $el.appendChild(child));
  } catch (e) {
    console.log(vNode);
    console.error(e);
  }

  return $el;
}
