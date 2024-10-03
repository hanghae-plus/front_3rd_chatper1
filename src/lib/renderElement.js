// renderElement.js
import { addEvent, removeEvent, setupEventListeners } from "./eventManager";
import { createElement__v2 } from "./createElement__v2.js";

// TODO: processVNode 함수 구현
function processVNode(vNode) {
  // vNode를 처리하여 렌더링 가능한 형태로 변환합니다.
  // - null, undefined, boolean 값 처리
  // - 문자열과 숫자를 문자열로 변환
  // - 함수형 컴포넌트 처리 <---- 이게 제일 중요합니다.
  // - 자식 요소들에 대해 재귀적으로 processVNode 호출
  if (vNode === null || vNode === undefined || typeof vNode === "boolean") {
    return document.createTextNode("");
  }

  if (typeof vNode === "string" || typeof vNode === "number") {
    return String(vNode);
  }

  if (typeof vNode.type === "function") {
    const componentVNode = vNode.type(vNode.props || {});
    return processVNode(componentVNode);
  }

  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => {
      const childNode = processVNode(child);
      fragment.appendChild(childNode);
    });
    return fragment;
  }

  const $el = document.createElement(vNode.type);

  for (const [key, value] of Object.entries(vNode.props || {})) {
    if (key.startsWith("on") && typeof value === "function") {
      $el.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (key === "className") {
      $el.setAttribute("class", value);
    } else if (key === "style" && typeof value === "object") {
      Object.assign($el.style, value);
    } else {
      $el.setAttribute(key, value);
    }
  }

  (vNode.children || []).forEach((child) => {
    const childNode = processVNode(child); // 재귀적으로 처리
    $el.appendChild(childNode);
  });

  return $el;
}

// TODO: updateAttributes 함수 구현
function updateAttributes(target, newProps = {}, oldProps = {}) {
  // DOM 요소의 속성을 업데이트합니다.
  // - 이전 props에서 제거된 속성 처리
  // - 새로운 props의 속성 추가 또는 업데이트
  // - 이벤트 리스너, className, style 등 특별한 경우 처리
  //   <이벤트 리스너 처리>
  //     - TODO: 'on'으로 시작하는 속성을 이벤트 리스너로 처리
  //     - 주의: 직접 addEventListener를 사용하지 않고, eventManager의 addEvent와 removeEvent 함수를 사용하세요.
  //     - 이는 이벤트 위임을 통해 효율적으로 이벤트를 관리하기 위함입니다.

  if (!target || typeof target.setAttribute !== "function") {
    return;
  }

  for (const [attr, value] of Object.entries(newProps)) {
    if (oldProps[attr] === value) continue;
    if (attr.startsWith("on")) {
      const eventType = attr.slice(2).toLowerCase();

      //  이전 리스너가 있을 경우 제거한다
      if (oldProps[attr]) {
        removeEvent(target, eventType, oldProps[attr]);
      }
      //  새로운 리스너를 추가
      if (value) {
        addEvent(target, eventType, value);
      }
    } else if (attr === "className") {
      target.setAttribute("class", value);
    } else if (attr === "style" && typeof value === "object") {
      Object.assign(target.style, value);
    } else {
      target.setAttribute(attr, value);
    }
  }

  for (const attr of Object.keys(oldProps)) {
    if (attr in newProps) continue;

    if (attr.startsWith("on")) {
      const eventType = attr.slice(2).toLowerCase();
      removeEvent(target, eventType, oldProps[attr]);
    } else if (attr === "className") {
      target.removeAttribute("class");
    } else {
      target.removeAttribute(attr);
    }
  }
}

// TODO: updateElement 함수 구현
function updateElement(parent, newNode, oldNode, index = 0) {
  // 1. 노드 제거 (newNode가 없고 oldNode가 있는 경우)
  if (!parent) return;
  if (!newNode && oldNode) {
    parent.removeChild(parent.childNodes[index]);
    return;
  }

  // 2. 새 노드 추가 (newNode가 있고 oldNode가 없는 경우)
  if (newNode && !oldNode) {
    parent.appendChild(createElement__v2(newNode));
    return;
  }

  // 3. 텍스트 노드 업데이트
  if (typeof newNode === "string" || typeof oldNode === "string") {
    if (newNode !== oldNode) {
      parent.replaceChild(
        document.createTextNode(newNode),
        parent.childNodes[index]
      );
    }
    return;
  }

  // 4. 노드 교체 (newNode와 oldNode의 타입이 다른 경우)
  if (newNode.type !== oldNode.type) {
    parent.replaceChild(createElement__v2(newNode), parent.childNodes[index]);
    return;
  }

  // 5. 같은 타입의 노드 업데이트
  const element = parent.childNodes[index];
  if (element) {
    // 5-1. 속성 업데이트
    updateAttributes(element, newNode.props || {}, oldNode.props || {});

    // 5-2. 자식 노드 재귀적 업데이트
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    const maxLength = Math.max(newLength, oldLength);
    for (let i = 0; i < maxLength; i++) {
      updateElement(
        parent.childNodes[index],
        newNode.children?.[i],
        oldNode.children?.[i],
        i
      );
    }
    // 5-3. 불필요한 자식 노드 제거
    while (element.childNodes.length > maxLength) {
      element.removeChild(element.lastChild);
    }
  }
}

// TODO: renderElement 함수 구현
export function renderElement(vNode, container) {
  // 최상위 수준의 렌더링 함수입니다.
  // - 이전 vNode와 새로운 vNode를 비교하여 업데이트
  // - 최초 렌더링과 업데이트 렌더링 처리
  // 이벤트 위임 설정
  // TODO: 렌더링이 완료된 후 setupEventListeners 함수를 호출하세요.
  // 이는 루트 컨테이너에 이벤트 위임을 설정하여 모든 하위 요소의 이벤트를 효율적으로 관리합니다.
  if (!container._vNode) {
    container.innerHTML = "";
    const newElement = createElement__v2(vNode);
    container.appendChild(newElement);
    container._vNode = vNode;
  } else {
    updateElement(container, vNode, container._vNode);
    container._vNode = vNode;
  }
  setupEventListeners(container);
}
