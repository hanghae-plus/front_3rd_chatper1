import { addEvent,removeEvent } from './eventManager';

export function createElement__v2(vNode) {
  // 이 함수는 createElement의 개선된 버전입니다.
  // 1. falsy vNode 처리
  if(!vNode) {
    return document.createTextNode('');
    
  }
  // 2. 문자열 또는 숫자 vNode 처리
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode(vNode);
  }
  
  
  // 3. 배열 vNode 처리 (DocumentFragment 사용)
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach(child => {
      const el = createElement__v2(child); // 각 자식에 대해 재귀적으로 createElement 호출
      fragment.appendChild(el); // DocumentFragment에 추가
    });
    return fragment; // DocumentFragment를 반환
  }
  
  if (typeof vNode.type === 'function') {
    return createElement__v2(vNode.type(vNode.props));
  }
  const $el = document.createElement(vNode.type);
  
  // 4. 일반 요소 vNode 처리:
  //    - 요소 생성
  //    - 속성 설정 (이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선)
  //    - 자식 요소 추가
  Object.entries(vNode.props || {})
    .filter(([attr, value]) => value)
    .forEach(([attr, value]) => {
    // 5-1. 이벤트 리스너 처리 (onClick, onChange 등)
    if (attr.startsWith('on')) {
      console.log(attr, value)
      const eventType = attr.slice(2).toLowerCase();
      addEvent($el, eventType, value); // 새로운 이벤트 리스너 추가
    } 
    // 5-2. className 처리 (class 속성 설정)
    if (attr === 'className') {
      $el.className = value; // className을 class 속성으로 적용
    } 
    // 5-3. 일반 속성 처리 (id, href, title 등)
    else {
      $el.setAttribute(attr, value);
    }
  });
  
  //    - vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가
  vNode.children.map(createElement__v2)
    .forEach(child => $el.appendChild(child));
  

  return $el;
}
