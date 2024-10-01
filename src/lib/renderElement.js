// renderElement.js
import { addEvent, removeEvent, setupEventListeners } from './eventManager';
import { createElement__v2 } from './createElement__v2.js';

// TODO: processVNode 함수 구현
function processVNode(vNode) {
  // vNode를 처리하여 렌더링 가능한 형태로 변환합니다.
  // - null, undefined, boolean 값 처리
  // - 문자열과 숫자를 문자열로 변환
  // - 함수형 컴포넌트 처리 <---- 이게 제일 중요합니다.
  // - 자식 요소들에 대해 재귀적으로 processVNode 호출

  if (vNode === null || vNode === undefined || typeof vNode === 'boolean') {
    return document.createTextNode('');
  }

  if (typeof vNode === 'number' || typeof vNode === 'string') {
    return document.createTextNode(vNode);
  }

  if (typeof vNode === 'function') {
    const result = vNode.type(vNode.props || {});

    return processVNode(result);
  }

  const $element = document.createElement(vNode.type);

  if (vNode.children) {
    vNode.children.map(processVNode).forEach((child) => $element.appendChild(child));
  }

  return $element;
}

// TODO: updateAttributes 함수 구현
function updateAttributes($element, oldProps, newProps) {
  console.log($element, oldProps, newProps, 'props!!!!!');
  // DOM 요소의 속성을 업데이트합니다.
  // - 이전 props에서 제거된 속성 처리
  // - 새로운 props의 속성 추가 또는 업데이트
  // - 이벤트 리스너, className, style 등 특별한 경우 처리
  //   <이벤트 리스너 처리>
  //     - TODO: 'on'으로 시작하는 속성을 이벤트 리스너로 처리
  //     - 주의: 직접 addEventListener를 사용하지 않고, eventManager의 addEvent와 removeEvent 함수를 사용하세요.
  //     - 이는 이벤트 위임을 통해 효율적으로 이벤트를 관리하기 위함입니다.
  oldProps = oldProps || {};
  newProps = newProps || {};

  for (const key in oldProps) {
    if (!(key in newProps)) {
      if (key === 'className') {
        $element.className = '';
      } else if (key.startsWith('on')) {
        const eventName = key.slice(2).toLowerCase();
        //TODO removeEvent 변경해야함
        $element.removeEventListener(eventName, value);
      } else if (key === 'style') {
        Object.assign($element.style, {});
      } else {
        $element.removeAttribute(key);
      }
    }
  }

  for (const [key, value] of Object.entries(newProps)) {
    if (value !== oldProps[key]) {
      console.log(oldProps[key], value, key, '!!!!!!!');
      if (key === 'className') {
        $element.className = value;
      } else if (key.startsWith('on')) {
        const eventName = key.slice(2).toLowerCase();
        //TODO addEvent로 변경해야함
        $element.addEventListener(eventName, value);
      } else if (key === 'style') {
        Object.assign($element.style, value);
      } else if (key in $element) {
        $element[key] = value;
      } else {
        $element.setAttribute(key, value);
      }
    }
  }

  return $element;
}

// TODO: updateElement 함수 구현
function updateElement($parent, newNode, oldNode, index = 0) {
  // 1. 노드 제거 (newNode가 없고 oldNode가 있는 경우)
  // TODO: oldNode만 존재하는 경우, 해당 노드를 DOM에서 제거

  console.log(oldNode, newNode);
  if (!newNode && oldNode) {
    $parent.removeChild($parent.childNodes[index]);
    return;
  }
  // 2. 새 노드 추가 (newNode가 있고 oldNode가 없는 경우)
  // TODO: newNode만 존재하는 경우, 새 노드를 생성하여 DOM에 추가

  if (newNode && !oldNode) {
    const newElement = createElement__v2(newNode);

    $parent.appendChild(newElement);

    return;
  }

  // 3. 텍스트 노드 업데이트
  // TODO: newNode와 oldNode가 둘 다 문자열 또는 숫자인 경우
  // TODO: 내용이 다르면 텍스트 노드 업데이트
  console.log(oldNode, 'olodNode', newNode);

  if (typeof oldNode === 'string' || typeof oldNode === 'number') {
    if (oldNode !== newNode) {
      $parent.childNodes[index].nodeValue = newNode;
    }
    return;
  }

  // 4. 노드 교체 (newNode와 oldNode의 타입이 다른 경우)
  // TODO: 타입이 다른 경우, 이전 노드를 제거하고 새 노드로 교체

  if (oldNode.type !== newNode.type) {
    const newElement = createElement__v2(newNode);
    $parent.replaceChild(newElement, $parent.childNodes[index]);

    return;
  }

  if (typeof newNode.type === 'function') {
    const newVNode = newNode.type(newNode.props);
    const oldVNode = oldNode.type(oldNode.props);

    updateElement($parent, newVNode, oldVNode, index);
    return;
  }

  // 5. 같은 타입의 노드 업데이트
  // 5-1. 속성 업데이트
  // TODO: updateAttributes 함수를 호출하여 속성 업데이트
  // 5-2. 자식 노드 재귀적 업데이트
  // TODO: newNode와 oldNode의 자식 노드들을 비교하며 재귀적으로 updateElement 호출
  // HINT: 최대 자식 수를 기준으로 루프를 돌며 업데이트
  // 5-3. 불필요한 자식 노드 제거
  // TODO: oldNode의 자식 수가 더 많은 경우, 남은 자식 노드들을 제거

  const $element = $parent.childNodes[index];

  updateAttributes($element, oldNode.props, newNode.props);

  const oldNodeChildren = oldNode.children || [];
  const newNodeChldren = newNode.children || [];

  const maxChildrenLength = Math.max(oldNodeChildren.length, newNodeChldren.length);

  for (let i = 0; i < maxChildrenLength; i++) {
    updateElement($element, newNodeChldren[i], oldNodeChildren[i], i);
  }

  if (oldNodeChildren.length > newNodeChldren.length) {
    for (let i = newNodeChldren.length; i < oldNodeChildren.length; i++) {
      $element.removeChild($element.childNodes[i]);
    }
  }
}

// TODO: renderElement 함수 구현
let oldNode = null;
export function renderElement(vNode, container) {
  // 최상위 수준의 렌더링 함수입니다.
  // - 이전 vNode와 새로운 vNode를 비교하여 업데이트
  // - 최초 렌더링과 업데이트 렌더링 처리

  if (!container.hasChildNodes()) {
    const $element = createElement__v2(vNode);

    container.appendChild($element);
  } else {
    updateElement(container, vNode, oldNode);
  }

  oldNode = vNode;

  setupEventListeners(container);

  // 이벤트 위임 설정
  // TODO: 렌더링이 완료된 후 setupEventListeners 함수를 호출하세요.
  // 이는 루트 컨테이너에 이벤트 위임을 설정하여 모든 하위 요소의 이벤트를 효율적으로 관리합니다.
}
