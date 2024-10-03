// renderElement.js
import { createElement__v2 } from "./createElement__v2";
import { addEvent, removeEvent, setupEventListeners } from "./eventManager";

// TODO: processVNode 함수 구현
function processVNode(vNode) {
  // vNode를 처리하여 렌더링 가능한 형태로 변환합니다.
  // - null, undefined, boolean 값 처리
  // - 문자열과 숫자를 문자열로 변환
  // - 함수형 컴포넌트 처리 <---- 이게 제일 중요합니다.
  // - 자식 요소들에 대해 재귀적으로 processVNode 호출

  // null, undefined, boolean 값 처리
  if (!vNode) return document.createTextNode("");

  // 문자열과 숫자를 문자열로 변환
  if (typeof vNode === "string" || typeof vNode === "number") {
    return vNode;
  }

  // 함수형 컴포넌트 처리
  if (typeof vNode.type === "function") {
    return processVNode(vNode.type(vNode.props));
  }

  const processedChildren = (vNode.children || []).map((child) =>
    processVNode(child)
  );

  // 자식 요소들에 대해 재귀적으로 processVNode 호출
  return {
    type: vNode.type,
    props: vNode.props || {},
    children: processedChildren,
  };
}

// TODO: updateAttributes 함수 구현
function updateAttributes(domElement, oldProps = {}, newProps = {}) {
  // DOM 요소의 속성을 업데이트합니다.
  // - 이전 props에서 제거된 속성 처리
  // - 새로운 props의 속성 추가 또는 업데이트
  // - 이벤트 리스너, className, style 등 특별한 경우 처리
  //   <이벤트 리스너 처리>
  //     - TODO: 'on'으로 시작하는 속성을 이벤트 리스너로 처리
  //     - 주의: 직접 addEventListener를 사용하지 않고, eventManager의 addEvent와 removeEvent 함수를 사용하세요.
  //     - 이는 이벤트 위임을 통해 효율적으로 이벤트를 관리하기 위함입니다.
  // 새로운 속성 추가 및 업데이트
  for (const [key, value] of Object.entries(newProps)) {
    if (key === "children") continue; // 자식은 따로 처리

    if (key.startsWith("on")) {
      // 이벤트 리스너 처리
      const eventName = key.slice(2).toLowerCase();
      const newEventHandler = newProps[key];
      const oldEventHandler = oldProps[key];

      if (newEventHandler !== oldEventHandler) {
        if (oldEventHandler) {
          removeEvent(domElement, eventName, oldEventHandler);
        }
        if (newEventHandler) {
          addEvent(eventName, domElement, newEventHandler);
        }
      }
    } else if (key === "className") {
      // className 처리
      domElement.className = value || "";
    } else if (key === "style") {
      // 스타일 처리 (객체)
      Object.assign(domElement.style, value);
    } else {
      // 일반 속성 처리
      domElement.setAttribute(key, value);
    }
  }

  // 제거된 속성 처리
  for (const key of Object.keys(oldProps)) {
    if (!(key in newProps)) {
      if (key.startsWith("on")) {
        const eventName = key.slice(2).toLowerCase();
        const oldEventHandler = oldProps[key];
        removeEvent(domElement, eventName, oldEventHandler);
      } else {
        domElement.removeAttribute(key);
      }
    }
  }
}

// TODO: updateElement 함수 구현
function updateElement(container, oldNode, newNode, index = 0) {
  // 1. 노드 제거 (newNode가 없고 oldNode가 있는 경우)
  // TODO: oldNode만 존재하는 경우, 해당 노드를 DOM에서 제거

  // 2. 새 노드 추가 (newNode가 있고 oldNode가 없는 경우)
  // TODO: newNode만 존재하는 경우, 새 노드를 생성하여 DOM에 추가

  // 3. 텍스트 노드 업데이트
  // TODO: newNode와 oldNode가 둘 다 문자열 또는 숫자인 경우
  // TODO: 내용이 다르면 텍스트 노드 업데이트

  // 4. 노드 교체 (newNode와 oldNode의 타입이 다른 경우)
  // TODO: 타입이 다른 경우, 이전 노드를 제거하고 새 노드로 교체

  // 5. 같은 타입의 노드 업데이트
  // 5-1. 속성 업데이트
  // TODO: updateAttributes 함수를 호출하여 속성 업데이트

  // 5-2. 자식 노드 재귀적 업데이트
  // TODO: newNode와 oldNode의 자식 노드들을 비교하며 재귀적으로 updateElement 호출
  // HINT: 최대 자식 수를 기준으로 루프를 돌며 업데이트

  // 5-3. 불필요한 자식 노드 제거
  // TODO: oldNode의 자식 수가 더 많은 경우, 남은 자식 노드들을 제거

  const oldElement = container.childNodes[index];

  // 1. oldNode만 있는 경우 (노드 제거)
  if (!newNode && oldNode) {
    if (oldElement) container.removeChild(oldElement);
    return;
  }

  // 2. newNode만 있는 경우 (노드 추가)
  if (newNode && !oldNode) {
    const newElement = createElement__v2(newNode);
    if (container.childNodes[index]) {
      container.insertBefore(newElement, container.childNodes[index]);
    } else {
      container.appendChild(newElement);
    }
    return;
  }

  // 3. 텍스트 노드 업데이트
  const isTextNewNode = ["string", "number"].includes(typeof newNode);
  const isTextOldNode = ["string", "number"].includes(typeof oldNode);
  if (isTextNewNode && isTextOldNode) {
    oldElement.textContent = newNode;
    return;
  }
  if (isTextNewNode) {
    const newTextElement = document.createTextNode(newNode);
    container.replaceChild(newTextElement, oldElement);
    return;
  }

  // 4. 노드 교체 (타입이 다른 경우)
  if (newNode.type !== oldNode.type) {
    const newElement = createElement__v2(newNode);
    if (oldElement) {
      container.replaceChild(newElement, oldElement); // 노드 교체
    } else {
      container.appendChild(newElement); // 새로운 노드 추가
    }
    return;
  }
  // 5. 같은 타입의 노드 업데이트
  // 5-1. 속성 업데이트
  if (oldElement) {
    updateAttributes(oldElement, oldNode.props || {}, newNode.props || {});

    // 5-2. 자식 노드 재귀적 업데이트
    const oldChildren = oldNode.children || [];
    const newChildren = newNode.children || [];
    const maxChildrenLength = Math.max(oldChildren.length, newChildren.length);

    for (let i = 0; i < maxChildrenLength; i++) {
      updateElement(oldElement, oldChildren[i], newChildren[i], i);
    }

    // 불필요한 자식 노드 제거
    while (oldElement.childNodes.length > newChildren.length) {
      oldElement.removeChild(oldElement.lastChild);
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
  if (!container) return;

  const newNode = processVNode(vNode);
  if (container?._oldNode) {
    // 업데이트 렌더링
    updateElement(container, container._oldNode, newNode);
  } else {
    // 최초 렌더링
    container.appendChild(createElement__v2(newNode));
  }

  container._oldNode = newNode; //최신 vNode로 업데이트

  // 이벤트 위임 설정 (렌더링 완료 후 호출)
  setupEventListeners(container);
}
