import { addEvent } from './eventManager';

// TODO: 이 함수는 createElement의 개선된 버전입니다.

// 배열을 입력받아 DocumentFragment를 생성하는 함수
function createFragmentFromArray(array) {
  // DocumentFragment 생성
  const fragment = document.createDocumentFragment();

  // 배열의 각 요소를 순회하며 fragment에 추가
  for (const item of array) {
    const $el = createElement__v2(item);
    if ($el) fragment.appendChild($el);
  }

  return fragment;
}

function handleAttrName(attr) {
  if (attr.startsWith('on')) return attr.slice(2).toLowerCase();
  if (attr === 'className') return 'class';
  return attr;
}

export function createElement__v2(vNode) {
  // 1. falsy vNode 처리
  if (!vNode) return document.createTextNode('');

  // 2. 문자열 또는 숫자 vNode 처리
  if (typeof vNode === 'string' || typeof vNode === 'number') return document.createTextNode(String(vNode));

  // 3. 배열 vNode 처리 (DocumentFragment 사용)
  if (Array.isArray(vNode)) return createFragmentFromArray(vNode);

  // 4. 일반 요소 vNode 처리:
  //    - 요소 생성
  const { type, props, children } = vNode;
  const $el = document.createElement(type);

  //    - 속성 설정 (이벤트 함수를 이벤트 위임 방식으로 등록할 수 있도록 개선)
  for (const [attr, value] of Object.entries(props || {})) {
    if (attr.startsWith('on')) {
      addEvent($el, handleAttrName(attr), value);
    } else $el.setAttribute(handleAttrName(attr), value);
  }

  //    - 자식 요소 추가
  try {
    const childrenEl = children.map(createElement__v2);

    for (const child of childrenEl) {
      $el.appendChild(child);
    }
  } catch (e) {
    console.log('err vNode:', vNode);
    console.error(e);
  }

  return $el;
}
