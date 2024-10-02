// 이 함수는 createElement의 개선된 버전입니다.
// 1. falsy vNode 처리
// 2. 문자열 또는 숫자 vNode 처리
// 3. 배열 vNode 처리 (DocumentFragment 사용)
// 4. 일반 요소 vNode 처리:
//    - 요소 생성
//    - 속성 설정 (이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선)
//    - 자식 요소 추가
/** @jsx createVNode */
import { createVNode } from './createVNode';

export function createElement__v2(vNode) {

  if(!vNode){
    return document.createTextNode('');
  }

  if(typeof vNode === 'string' || typeof vNode === 'number'){
    return document.createTextNode(vNode);
  }

  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach(child => fragment.appendChild(createElement__v2(child)));
    return fragment;
  }

  if (typeof vNode.type === 'function') {
    return createElement__v2(vNode.type(vNode.props || {}))
  }

  const element = document.createElement__v2(vNode.type);

  if (vNode.props) {
    const eventHandlers = [];

    Object.entries(vNode.props).forEach(([key, value]) => {
      if (key.startsWith('on') && typeof value === 'function') {
        const eventName = key.slice(2).toLowerCase();
        eventHandlers.push({ event: eventName, handler: value });
      } else if (key === 'className') {
        element.className = value;
      } else if (key === 'style' && typeof value === 'object' && value) {
        Object.assign(element.style, value);
      } else {
        if (key in element) {
          element[key] = value;
        } else {
          element.setAttribute(key, value);
        }
      }
    });
    if (eventHandlers.length > 0) {
      const handleEvent = (event) => {
        const target = event.target;
        eventHandlers.forEach(({ event: eventName, handler }) => {
          if (target.matches(`[data-event="${eventName}"]`)) {
            handler(event);
          }
        });
      };
      eventHandlers.forEach(({ event: eventName }) => {
        element.addEventListener(eventName, handleEvent);
      });
    }
  }

  if (vNode.children) {
    const fragment = document.createDocumentFragment();
    vNode.children.forEach(child => {
      fragment.appendChild(createElement__v2(child));
    })
    element.appendChild(fragment);
  }

  return element

}
