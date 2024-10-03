// renderElement.js
import { addEvent, removeEvent, setupEventListeners } from "./eventManager.js";
import { createElement__v2 } from "./createElement__v2.js";

// TODO: processVNode 함수 구현
export function processVNode(vNode) {
  // vNode를 처리하여 렌더링 가능한 형태로 변환합니다.
  // - null, undefined, boolean 값 처리
  // - 문자열과 숫자를 문자열로 변환
  // - 함수형 컴포넌트 처리 <---- 이게 제일 중요합니다.
  // - 자식 요소들에 대해 재귀적으로 processVNode 호출

  // if (!vNode) return ''
  // // - 문자열과 숫자를 문자열로 변환
  // if (isNumOrStr(vNode)) return vNode.toString()
  // // - 함수형 컴포넌트 처리 <---- 이게 제일 중요합니다.
  // if (typeof vNode.type === 'function') return processVNode(vNode.type(vNode.props))
  // // - 자식 요소들에 대해 재귀적으로 processVNode 호출
  // const children = vNode.children ? vNode.children.map(processVNode) : []

  if (
    vNode === null ||
    vNode === undefined ||
    typeof vNode === "boolean" ||
    (typeof vNode === "object" && Object.keys(vNode).length === 0)
  )
    return "";

  if (typeof vNode === "string" || typeof vNode === "number")
    return String(vNode);

  if (Array.isArray(vNode)) {
    return vNode.map((child) => processVNode(child));
  }

  const { children = [], props = {} } = vNode;

  if (typeof vNode.type === "function") {
    return processVNode(vNode.type({ ...props, children }));
  }

  vNode.children = children.map(processVNode).filter((child) => {
    if (child === 0) return true;
    return Boolean(child);
  });

  return vNode;
}

// TODO: updateAttributes 함수 구현
function updateAttributes({ currentElement, oldProps, newProps }) {
  // DOM 요소의 속성을 업데이트합니다.
  // - 이전 props에서 제거된 속성 처리
  // - 새로운 props의 속성 추가 또는 업데이트
  // - 이벤트 리스너, className, style 등 특별한 경우 처리
  //   <이벤트 리스너 처리>
  //     - TODO: 'on'으로 시작하는 속성을 이벤트 리스너로 처리
  //     - 주의: 직접 addEventListener를 사용하지 않고, eventManager의 addEvent와 removeEvent 함수를 사용하세요.
  //     - 이는 이벤트 위임을 통해 효율적으로 이벤트를 관리하기 위함입니다.

  for (let key in oldProps) {
    if (!(key in newProps)) {
      if (key.startsWith("on")) {
        const eventType = key.toLowerCase().substring(2);
        removeEvent(eventType, currentElement, oldProps[key]);
      } else if (key === "className") {
        currentElement.removeAttribute("class");
      } else if (key === "style") {
        currentElement.removeAttribute("style");
      }
    }
  }

  for (let key in newProps) {
    if (oldProps[key] !== newProps[key]) {
      if (key.startsWith("on")) {
        const eventType = key.toLowerCase().substring(2);
        addEvent(eventType, currentElement, newProps[key]);
      } else if (key === "className") {
        currentElement.setAttribute("class", newProps[key]);
      } else {
        currentElement.setAttribute(key, newProps[key]);
      }
    }
  }
}

// TODO: updateElement 함수 구현
function updateElement({ oldNode, newNode, container, idx = 0 }) {
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

  const currentElement = container.childNodes[idx];

  if (!newNode && !!oldNode) {
    return container.removeChild(currentElement);
  }

  if (!!newNode && !oldNode) {
    return container.appendChild(createElement__v2(newNode));
  }

  if (
    (typeof oldNode === "string" || typeof oldNode === "number") &&
    (typeof newNode === "string" || typeof newNode === "number")
  ) {
    if (String(oldNode) !== String(newNode)) {
      currentElement.textContent = newNode;
    }
    return "";
  }

  const oldType = oldNode.type;
  const oldProps = oldNode.props || {};
  const oldChildren = oldNode.children || [];
  const oldChildrenLength = oldChildren.length;

  const newType = newNode.type;
  const newProps = newNode.props || {};
  const newChildren = newNode.children || [];
  const newChildrenLength = newChildren.length;

  if (oldType !== newType) {
    return container.replaceChild(createElement__v2(newNode), currentElement);
  }

  updateAttributes({ currentElement, oldProps, newProps });

  const maxChildrenLength = Math.max(oldChildrenLength, newChildrenLength);

  for (let i = 0; i < maxChildrenLength; i++) {
    const oldChild = oldChildren[i];
    const newChild = newChildren[i];

    if (i > newChildrenLength) container.removeChild(oldChild);
    else
      updateElement({
        oldNode: oldChild,
        newNode: newChild,
        container: currentElement,
        idx: i,
      });
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
  const oldNode = container._vNode;
  const newNode = processVNode(vNode);
  if (!oldNode) container.appendChild(createElement__v2(newNode));
  else updateElement({ oldNode, newNode, container });

  container._vNode = newNode;
  setupEventListeners(container);
}
