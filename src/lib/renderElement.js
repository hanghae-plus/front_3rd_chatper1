import { addEvent, removeEvent, setupEventListeners } from "./eventManager";
import { createElement__v2 } from "./createElement__v2.js";

// processVNode: vNode를 처리하여 렌더링 가능한 형태로 변환합니다.
function processVNode(vNode) {
  // vNode가 null, undefined, boolean인 경우 빈 텍스트 노드를 반환
  if (!vNode || typeof vNode === "boolean") {
    return document.createTextNode("");
  }

  // vNode가 string이나 number인 경우 텍스트로 변환하여 반환
  if (typeof vNode === "string" || typeof vNode === "number") {
    return String(vNode);
  }

  // 함수형 컴포넌트 처리
  if (typeof vNode.type === "function") {
    return processVNode(
      vNode.type({ ...vNode.props, children: vNode.children })
    );
  }

  // 자식 요소들을 재귀적으로 processVNode 호출하여 처리
  const processedChildren = (vNode.children || []).map((child) =>
    processVNode(child)
  );

  return {
    ...vNode,
    children: processedChildren.filter(Boolean),
  };
}

// updateAttributes: DOM 요소의 속성을 업데이트합니다.
function updateAttributes(target, newProps = {}, oldProps = {}) {
  for (const [key, value] of Object.entries(newProps)) {
    // 'on'으로 시작하는 속성을 이벤트 리스너로 처리
    if (key.startsWith("on") && typeof value === "function") {
      const eventType = key.slice(2).toLowerCase(); // onClick -> click으로 변환
      const oldEventHandler = oldProps[key];

      // 기존 핸들러와 같으면 생략
      if (value === oldEventHandler) continue;

      // 기존 이벤트 리스너 제거 후 새 이벤트 리스너 추가
      oldEventHandler && removeEvent(target, eventType, oldEventHandler);
      addEvent(target, eventType, value);
    }
    // className을 class로 변환하여 설정
    else if (key === "className") {
      target.setAttribute("class", value || "");
    }
    // style 객체를 처리하여 적용
    else if (key === "style") {
      Object.assign(target.style, value); // 스타일 객체 병합
    }
    // 기타 속성 처리
    else {
      target.setAttribute(key, value);
    }
  }

  // 제거된 속성 처리
  for (const [key, value] of Object.entries(oldProps)) {
    // newProps에 없는 속성만 제거
    if (!(key in newProps)) {
      // 'on'으로 시작하는 속성을 이벤트 리스너로 처리
      if (key.startsWith("on") && typeof value === "function") {
        const eventType = key.slice(2).toLowerCase();
        removeEvent(target, eventType, value);
      }
      // className 속성을 제거하고 class를 설정
      else if (key === "className") {
        target.removeAttribute("class");
        target.removeAttribute("classname");
      }
      // 그 외 속성 제거
      else {
        target.removeAttribute(key);
      }
    }
  }
}

// updateElement: 기존 노드와 새로운 노드를 비교하며 DOM을 업데이트하는 함수
function updateElement(parentElement, newVNode, oldVNode, index = 0) {
  const currentNode = parentElement.childNodes[index];

  // 1. 새 노드가 없고 기존 노드만 있으면 제거
  if (!newVNode && oldVNode) {
    return currentNode && parentElement.removeChild(currentNode);
  }

  // 2. 새 노드만 있을 경우 새 요소를 추가
  if (newVNode && !oldVNode) {
    return parentElement.appendChild(createElement__v2(newVNode));
  }

  // 3. 텍스트 노드일 경우 텍스트 업데이트
  if (typeof newVNode === "string" || typeof newVNode === "number") {
    if (newVNode !== oldVNode && currentNode) {
      const newTextNode = document.createTextNode(String(newVNode));
      parentElement.replaceChild(newTextNode, currentNode);
    }
    return;
  }

  // 4. 노드 타입이 다를 경우 노드를 교체
  if (newVNode.type !== oldVNode.type) {
    parentElement.replaceChild(createElement__v2(newVNode), currentNode);
    return;
  }

  // 5. 같은 타입의 노드일 경우 속성 및 자식 노드를 업데이트
  if (!currentNode) return; // 노드가 없으면 종료

  // 속성 업데이트
  updateAttributes(currentNode, newVNode.props || {}, oldVNode.props || {});

  const newChildren = newVNode.children || []; // 새 자식 노드 배열
  const oldChildren = oldVNode.children || []; // 기존 자식 노드 배열
  const maxLength = Math.max(newChildren.length, oldChildren.length); // 최대 자식 길이 계산

  // 자식 노드를 재귀적으로 업데이트
  for (let i = 0; i < maxLength; i++) {
    updateElement(currentNode, newChildren[i], oldChildren[i], i);
  }

  // 불필요한 자식 노드 제거
  while (currentNode.childNodes.length > newChildren.length) {
    currentNode.removeChild(currentNode.lastChild);
  }
}

// renderElement: 최상위 수준의 렌더링 함수
export function renderElement(vNode, container) {
  const oldVNode = container.oldVNode; // 이전 vNode 저장 (최적화용)
  const newVNode = processVNode(vNode); // 새 vNode 생성

  // 기존 노드가 있으면 업데이트, 없으면 최초 렌더링
  if (oldVNode) {
    updateElement(container, newVNode, oldVNode); // 업데이트 렌더링
  } else {
    container.appendChild(createElement__v2(newVNode)); // 최초 렌더링
  }

  container.oldVNode = newVNode; // 최신 vNode로 업데이트

  // 이벤트 위임 설정
  setupEventListeners(container);
}
