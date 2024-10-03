import { addEvent } from "./eventManager";

export const createElement__v2 = (vNode) => {
  // 이 함수는 createElement의 개선된 버전입니다.
  // 1. falsy vNode 처리
  // 2. 문자열 또는 숫자 vNode 처리
  // 3. 배열 vNode 처리 (DocumentFragment 사용)
  // 4. 일반 요소 vNode 처리:
  //    - 요소 생성
  //    - 속성 설정 (이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선)
  //    - 자식 요소 추가

  if (!vNode) {
    return document.createTextNode("");
  }

  if (typeof vNode === "string" || typeof vNode === "number") {
    // text node를 만들어서 반환한다.
    return document.createTextNode(String(vNode));
  }

  //DocumentFragment:
  // 웹 문서의 메인 DOM 트리에 포함되지 않는, 가상 메모리에 존재하는 DOM 노드 객체입니다. DocumentFragment 노드를 사용하면 메인 DOM 트리 외부에 경량화된 DOM을 만들 수 있어 브라우저 repaint 영향 없이 메모리에서 DOM 조작이 가능합니다.

  if (Array.isArray(vNode)) {
    // 배열 체크
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => {
      // forEach 배열만 접근가능
      fragment.appendChild(createElement__v2(child));
    });
    return fragment;
  }

  if (typeof vNode.type === "function") {
    return createElement__v2(vNode.type(vNode.props));
  }

  const element = document.createElement(vNode.type);

  if (vNode.props) {
    applyProps(element, vNode.props)
  } else {

  };
  if (vNode.children || []) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < vNode.children.length; i++) {
      fragment.appendChild(createElement__v2(vNode.children[i]));
    }
    element.appendChild(fragment);
  }
  return element;

  // const element = document.createElement(vNode.type);

  // element.vProps = vNode.props || {};

  //    - 속성 설정 (이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선)
  // for (const [key, value] of Object.entries(vNode.props || {})) {
  //   if (key.startsWith('on') && typeof value === 'function') {
  //     const eventType = key.slice(2).toLowerCase();
  //     addEvent(element, eventType, value);
  //   } else if (key === 'className') {
  //     element.className = value;
  //   } else {
  //     element.setAttribute(key, value);
  //   }
  // }

  //    - 자식 요소 추가
  (vNode.children || []).forEach((child) => {
    element.appendChild(createElement__v2(child));
  });

  return element;
};

// 속성 적용 함수
// element : vNode.type : div, h, span, img 등등
// props:  속성, 객체임. ex) {className(속성) : "hello"(속성값), id:"user"}
// children : 현재 요소의 자식 요소가 포함된 HTMLCollection을 반환합니다. 비 요소 노드는 모두 제외됩니다.
// childNodes : 비요소 노드까지 포함함. ex) 주석까지 나옴. 거의 안쓸거 같음.

function applyProps(element, props) {
  for (const key in props) {
    const value = props[key];
    if (key.startsWith("on") && typeof value === "function") {
      // startsWith 내장함수 : 첫시작글자 입력서 boolean으로 반환함.
      const eventType = key.slice(2).toLowerCase();
      addEvent(element, eventType, value);
    } else if (key === "className") {
      element.className = value;
    } else {
      element.setAttribute(key, value);
      console.log(element.setAttribute(key, value))
      console.log('hi')
    }
  }
}
