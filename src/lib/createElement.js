// TODO: createElement 함수 구현
// 1. vNode가 falsy면 빈 텍스트 노드를 반환합니다.
// 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.
// 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.
// 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.
// 5. 위 경우가 아니면 실제 DOM 요소를 생성합니다:
//    - vNode.type에 해당하는 요소를 생성
//    - vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)
//    - vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가

export function createElement(vNode) {
  // 여기에 구현하세요
  if(vNode === false || vNode === null || vNode === ''){
    // falsy면 빈 텍스트 노드를 반환
    return document.createTextNode('');
  } 
  
  if(vNode === undefined){
    return null;
  } 
  
  if(typeof vNode === 'string' || typeof vNode === 'number'){
    // 문자열이나 숫자면 텍스트노드 반환
    return document.createTextNode(vNode);
  } 
  
  if(Array.isArray(vNode)) {
    // 배열 입력에 대해 DocumentFragment 생성 + 각 자식에 대해 createDlement를 재귀 호출
    const createFNode = document.createDocumentFragment();
    vNode.forEach((childVNode) => {
      const CNode = createElement(childVNode); // 재귀 호출
      // undefined 처리
      if(CNode !== null || CNode !== undefined){
        createFNode.appendChild(CNode);
      }
    })
    return createFNode;
  } 
  
  if(typeof vNode.type === 'function') {
    const funVNode = vNode.type(vNode.props || {});
    return createElement(funVNode);
  }
  
  
  if (typeof vNode === 'object' && vNode.type) {
    // 일반요소 노드 생성
    const $el = document.createElement(vNode.type)

    // 속성설정
    Object.entries(vNode.props || {})
      .filter(([key, value]) => value)
      .forEach(([key, value]) => {

        if(key === 'id'){
          $el.id = value;
        }else if(key === 'className') {
          $el.className = value;
        }else if(key.startsWith('on')) {
          // 이벤트 리스너 onclick만
          $el.addEventListener(key.slice(2).toLowerCase(), value);
        } else {
          $el.setAttribute(key, value);
        }
      })

    // 자식 요소
    const children = (vNode.children || [])
    .map(createElement)
    .filter(child => child !== null); //undifined 자식 필터링

    children.forEach(child => {
      $el.appendChild(child);
    })

    return $el;

  }

  return null;
}
