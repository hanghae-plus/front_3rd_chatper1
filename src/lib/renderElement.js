import { addEvent, removeEvent, setupEventListeners } from './eventManager';
import { createElement__v2 } from './createElement__v2.js';
import { isBooleanProp, isEventProp, isInValidVNode, removeBooleanProp, setBooleanProp, setStyleProp } from '../utils';

// vNode를 처리하여 렌더링 가능한 형태로 변환합니다.
function processVNode(vNode) {
  // null, undefined, boolean 값 처리
  if (isInValidVNode(vNode)) {
    return '';
  }

  // 문자열과 숫자를 문자열로 변환
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return vNode.toString();
  }

  if (Array.isArray(vNode)) {
    return vNode.map(processVNode);
  }

  // 함수형 컴포넌트 처리
  if (typeof vNode.type === 'function') {
    return processVNode(vNode.type(vNode.props));
  }

  // 자식 요소들에 대해 재귀적으로 processVNode 호출
  vNode.children = vNode.children.map(processVNode);
  return vNode;
}

function setProp($el, name, value) {
  if (name === 'className') {
    $el.setAttribute('class', value);
  } else if (name === 'style') {
    setStyleProp($el, value);
  } else if (isBooleanProp(name, value)) {
    setBooleanProp($el, name, value);
  } else if (isEventProp(name, value)) {
    const eventType = name.slice(2).toLowerCase();
    addEvent($el, eventType, value);
  } else {
    $el.setAttribute(name, value);
  }
}

function removeProp($el, name, value) {
  if (name === 'className') {
    $el.removeAttribute('class');
  } else if (isBooleanProp(name, value)) {
    removeBooleanProp($el, name);
  } else if (isEventProp(name, value)) {
    const eventType = name.slice(2).toLowerCase();
    removeEvent($el, eventType);
  } else {
    $el.removeAttribute(name);
  }
}

// TODO: 코드 리팩토링
function updateAttributes($el, newProps, oldProps) {
  const newPropsKeys = Object.keys(newProps);
  const oldPropKeys = Object.keys(oldProps);

  newPropsKeys.forEach((name) => {
    if (newProps[name] !== oldProps[name]) {
      setProp($el, name, newProps[name]);
    }
  });

  oldPropKeys.forEach((name) => {
    if (!newPropsKeys.includes(name)) {
      removeProp($el, name, oldProps[name]);
    }
  });
}

function isNodeChange(newNode, oldNode) {
  return (
    typeof newNode !== typeof oldNode ||
    (typeof newNode === 'string' && newNode !== oldNode) ||
    newNode.type !== oldNode.type
  );
}

function updateElement($parent, newNode, oldNode, index = 0) {
  // 노드 제거 (newNode가 없고 oldNode가 있는 경우)
  // oldNode만 존재하는 경우, 해당 노드를 DOM에서 제거
  if (!newNode) {
    // Dom에서 노드가 제거되면서 한 칸씩 당겨지는 오류 방지
    if ($parent.childNodes[index]) {
      $parent.removeChild($parent.childNodes[index]);
    }

    return;
  }

  // 새 노드 추가 (newNode가 있고 oldNode가 없는 경우)
  // newNode만 존재하는 경우, 새 노드를 생성하여 DOM에 추가
  if (!oldNode) {
    $parent.appendChild(createElement__v2(newNode));
    return;
  }

  // 노드 교체
  if (isNodeChange(newNode, oldNode)) {
    $parent.replaceChild(createElement__v2(newNode), $parent.childNodes[index]);
    return;
  }

  // 엘리먼트 노드
  if (newNode.type && oldNode.type) {
    const $currentElement = $parent.childNodes[index];
    // 속성 업데이트
    updateAttributes($currentElement, newNode.props || {}, oldNode.props || {});

    // 자식 노드 재귀적 업데이트
    const newChildren = newNode.children;
    const oldChildren = oldNode.children;

    // TODO: 이 부분 팀원들한테 질문하기
    // 새로운 자식 노드를 기준으로 updateElement를 실행
    for (let i = 0; i < newChildren.length; i++) {
      updateElement($currentElement, newNode.children[i], oldNode.children[i], i);
    }

    // 남은 이전 자식 노드들 뒤에서 부터 제거
    if (oldChildren.length > newChildren.length) {
      while ($currentElement.childNodes.length > newChildren.length) {
        $currentElement.removeChild($currentElement.lastChild);
      }
    }

    return;
  }
}

export function renderElement(vNode, $container) {
  if ($container) {
    const oldNode = $container._vNode ?? null;
    const newNode = processVNode(vNode);

    if (!oldNode) {
      $container.appendChild(createElement__v2(newNode));
    } else {
      updateElement($container, newNode, oldNode);
    }

    $container._vNode = newNode;

    setupEventListeners($container);
  }
}
