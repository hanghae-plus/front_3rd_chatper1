// TODO: createElement 함수 구현

import { types } from '@babel/core';
import { createVNode } from './createVNode';

export const createElement = (vNode) =>  {
  // 1. vNode가 falsy면 빈 텍스트 노드를 반환합니다.

  if (!vNode) {
    return document.createTextNode = "";
  }

  // 2. vNode가 문자열이나 숫자면 텍스트 노드를 생성하여 반환합니다.

  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return document.createTextNode = String(vNode);
  }

  // 3. vNode가 배열이면 DocumentFragment를 생성하고 각 자식에 대해 createElement를 재귀 호출하여 추가합니다.

  if (Array.isArray(vNode)) { // 배열 체크
    const fragment = document.DocumentFragment();
    for (let i = 0; i < vNode.length; i++) {
      fragment.appendChild(createElement(vNode[i]));
    }
    return fragment;
  }

  // 4. vNode.type이 함수면 해당 함수를 호출하고 그 결과로 createElement를 재귀 호출합니다.

  if (typeof vNode.type ==='function') {
    const {type, props,children} = vNode.type(vNode.props || {});
    return createElement(createVNode(type, props, children));
  }

  // 5. 위 경우가 아니면 실제 DOM 요소를 생성합니다:

  // 5-1 vNode.type에 해당하는 요소를 생성

  const element = document.createElement(vNode.type);

  // 5-2 vNode.props의 속성들을 적용 (이벤트 리스너, className, 일반 속성 등 처리)

  if (vNode.props) applyProps(element, vNode.props);

  // 5-3 vNode.children의 각 자식에 대해 createElement를 재귀 호출하여 추가

  if (vNode.children) {
    const fragment = document.DocumentFragment();
    for (let i = 0; i < vNode.children.length; i++) {
      fragment.appendChild(createElement(vNode.children[i]));
    }
    element.appendChild(fragment);
  }
  return element;
}

  // 속성 적용 함수
  // element : vNode.type : div, h, span, img 등등
  // props:  속성, 객체임. ex) {className(속성) : "hello"(속성값), id:"user"}
  // children : 현재 요소의 자식 요소가 포함된 HTMLCollection을 반환합니다. 비 요소 노드는 모두 제외됩니다.
  // childNodes : 비요소 노드까지 포함함. ex) 주석까지 나옴. 거의 안쓸거 같음.

  function applyProps(element, props) {
    for (const key in props) {
      const value = props[key];
      if (key.startsWith('on') && typeof value === 'function') { // startsWith 내장함수 : 첫시작글자 입력서 boolean으로 반환함.
        element.addEventListener(key.slice(2).toLowerCase(), value); // slice 내장함수 : 인덱싱 된 부분부터 데이터가 나옴.
      } else if (key === 'className') {
        element.className = value;
      } else {
        element.setAttribute(key, value);
      }
    }
  }