import { addEvent } from "./eventManager";



export function createElement__v2(vNode) {
  // 이 함수는 createElement의 개선된 버전입니다.
// 1. falsy vNode 처리
// 2. 문자열 또는 숫자 vNode 처리
// 3. 배열 vNode 처리 (DocumentFragment 사용)
// 4. 일반 요소 vNode 처리:
//    - 요소 생성
//    - 속성 설정 (이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선)
//    - 자식 요소 추가


// 1. falsy vNode 처리
if (!vNode) {
  return document.createTextNode('');
}

// 2. 문자열 또는 숫자 vNode 처리
if(typeof vNode === 'string' || typeof vNode === 'number'){
  return document.createTextNode(vNode);
} 

// 3. 배열 vNode 처리 (DocumentFragment 사용)
if (Array.isArray(vNode)) {
  const fragment = document.createDocumentFragment();
  vNode.forEach((child) => fragment.appendChild(createElement__v2(child)))
  return fragment;
}

// 함수
if(typeof vNode.type === 'function') {
  const funVNode = vNode.type(vNode.props);
  return createElement__v2(funVNode);
}


// 4. 일반 요소 vNode 처리:
//    - 요소 생성
const $el = document.createElement(vNode.type)

//    - 속성 설정 (이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선)
if (vNode.props) {

  // 속성설정
  Object.entries(vNode.props)
    .filter(([key, value]) => value)
    .forEach(([key, value]) => {

      // 이벤트 위임 
      if(key === 'className') {
        $el.className = value
      }else if(key.startsWith('on')) {
        const event = key.slice(2).toLowerCase()

        addEvent($el, event, value)

      } else {
        $el.setAttribute(key, value)
      }
    })

    // 오류낸 원인 분석하기 - 심화과제 이벤트 리스너 제거
  // Object.entries(vNode.props)
  // .filter(([key, value]) => value)
  // .forEach(([key, value]) => {

  //   if(key === 'className') {
  //     $el.className = value
  //   }else if(key.startsWith('on')) {
  //     $el.addEventListener(key.slice(2).toLowerCase(), value)

  //   } else {
  //     $el.setAttribute(key, value)
  //   }
  // })


}


if(vNode.children) {

  const fragment = document.createDocumentFragment()

  vNode.children.forEach((child) =>
    fragment.appendChild(createElement__v2(child))
  )
  $el.appendChild(fragment)
}

return $el

}
