// TODO: createElement 함수 구현

export function createElement(vNode) {
  // 1. vNode가 falsy면 빈 텍스트 노드를 반환합니다.
  if(!vNode) {
    return document.createTextNode('');

  }
  // 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(vNode);
  }
  
  
  // 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach(child => {
      const el = createElement(child); // 각 자식에 대해 재귀적으로 createElement 호출
      fragment.appendChild(el); // DocumentFragment에 추가
    });
    return fragment; // DocumentFragment를 반환
  }
  
  // 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
  if (typeof vNode.type === 'function') {
    // 함수형 컴포넌트일 경우, 호출하여 반환된 값을 처리
    //vNode.type(vNode.props)는 함수형 컴포넌트에 정확히 필요한 인자(props: 실제 컴포넌트에 필요한 값들(속성, 이벤트 핸들러 등)을 포함)를 전달
    return createElement(vNode.type(vNode.props));
  }
  
  const $el = document.createElement(vNode.type);

  // 5. 위 경우가 아니면 실제 DOM 요소를 생성합니다:
  //    - vNode.type에 해당하는 요소를 생성
  //    - vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
  Object.entries(vNode.props || {})
  .filter(([attr, value]) => value)
  .forEach(([attr, value]) => {
    // 5-1. 이벤트 리스너 처리 (onClick, onChange 등)
    if (attr.startsWith('on')) {
      const eventType = attr.slice(2).toLowerCase(); // 'onClick' -> 'click'
      // $el.addEventListener(eventType, value);
      $el.addEventListener(eventType, (e) => {
        e.preventDefault(); // 기본 동작을 막음
        value(e); // 원래의 이벤트 핸들러 실행
      });
    } 
    // 5-2. className 처리 (class 속성 설정)
    else if (attr === 'className') {
      $el.className = value; // className을 class 속성으로 적용
    } 
    // 5-3. 일반 속성 처리 (id, href, title 등)
    else {
      $el.setAttribute(attr, value);
    }
  });
  
  //    - vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가
  vNode.children.map(createElement)
    .forEach(child => $el.appendChild(child));
  

  return $el;
}
