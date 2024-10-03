// renderElement.js
import { addEvent, removeEvent, setupEventListeners } from "./eventManager";
import { createElement__v2 } from "./createElement__v2.js";

/**
 * TODO: processVNode 함수 구현
 * 주어진 가상 DOM(vNode)을 처리하여 렌더링 가능한 형태로 변환
 */
function processVNode(vNode) {
  // - null, undefined, boolean 값 처리
  if (
    vNode === null ||
    vNode === undefined ||
    typeof vNode === "boolean" ||
    vNode === ""
  ) {
    return "";
  }
  // - 문자열과 숫자를 문자열로 변환
  if (typeof vNode === "string" || typeof vNode === "number") {
    return String(vNode);
  }

  // - 함수형 컴포넌트 처리
  if (typeof vNode.type === "function") {
    return processVNode(vNode.type(vNode.props)); // 반환된 vNode를 재귀적으로 처리
  }

  // - 자식 요소들에 대해 재귀적으로 processVNode 호출
  vNode.children.map(processVNode);

  return vNode;
}

/**
 * TODO: updateAttributes 함수 구현
 * 주어진 가상 DOM(vNode)을 처리하여 렌더링 가능한 형태로 변환
 */
function updateAttributes($element, newNode, oldNode) {
  const oldProps = oldNode.props || {};
  const newProps = newNode.props || {};

  const allKeys = new Set([...Object.keys(oldProps), ...Object.keys(newProps)]);

  allKeys.forEach((key) => {
    const oldValue = oldProps[key];
    const newValue = newProps[key];

    if (newValue === undefined) {
      updateAttribute({ type: "remove", $element, key, value: oldValue });
    } else if (oldValue === undefined) {
      updateAttribute({ type: "add", $element, key, value: newValue });
    } else if (oldValue !== newValue) {
      updateAttribute({ type: "update", $element, key, value: newValue });
    }
  });
}
function updateAttribute(attributeInfo) {
  // - 이벤트 리스너, className, style 등 특별한 경우 처리
  //   <이벤트 리스너 처리>
  //     - TODO: 'on'으로 시작하는 속성을 이벤트 리스너로 처리
  //     - 주의: 직접 addEventListener를 사용하지 않고, eventManager의 addEvent와 removeEvent 함수를 사용하세요.
  //     - 이는 이벤트 위임을 통해 효율적으로 이벤트를 관리하기 위함입니다.
  const { key, value, type, $element } = attributeInfo;
  if (key.startsWith("on")) {
    const eventType = key.toLowerCase().substring(2);

    if (type === "remove" || type === "update")
      removeEvent($element, eventType, value);
    if (type === "add" || type === "update")
      addEvent($element, eventType, value);
    return;
  }

  let newKey = key;
  let newValue = value;

  if (key === "className") {
    newKey = "class";
  }

  // setAttribute를 사용하면 동일한 key가 있을 경우 덮어씌워지기 때문에 removeAttribute 사용할 필요 없음
  if (type === "add" || type === "update")
    $element.setAttribute(newKey, newValue);
  else if (type === "remove") $element.removeAttribute(newKey);
}

// TODO: updateElement 함수 구현
function updateElement(
  newNode,
  oldNode,
  $parentElement,
  $currentElement = null
) {
  $currentElement = $currentElement || $parentElement.firstChild;

  // 1. 노드 제거: newNode가 없는 경우
  if (!newNode) {
    return $parentElement.removeChild($currentElement);
  }

  // 2. 새 노드 추가: oldNode가 없는 경우
  if (!oldNode) {
    return $parentElement.appendChild(createElement__v2(newNode));
  }

  // 3. 텍스트 노드 업데이트: 둘 다 텍스트인 경우
  if (isTextNode(newNode) && isTextNode(oldNode)) {
    if (newNode !== oldNode) {
      return $parentElement.replaceChild(
        createElement__v2(newNode),
        $currentElement
      );
    }
    return;
  }

  // 4. 노드 타입이 다른 경우: 교체
  if (newNode.type !== oldNode.type) {
    $parentElement.removeChild($currentElement);
    return $parentElement.appendChild(createElement__v2(newNode));
  }

  // 5-1. 속성 업데이트
  updateAttributes($currentElement, newNode, oldNode);

  // 5-2. 자식 노드 재귀적으로 업데이트
  const newChildren = newNode.children || [];
  const oldChildren = oldNode.children || [];

  newChildren.forEach((newChild, i) => {
    const $nextChildElement = $currentElement.childNodes[i];
    updateElement(newChild, oldChildren[i], $currentElement, $nextChildElement);
  });

  // 5-3. 불필요한 자식 노드 제거
  if (newChildren.length < oldChildren.length) {
    for (let i = newChildren.length; i < oldChildren.length; i++) {
      $currentElement.removeChild(
        $currentElement.childNodes[newChildren.length]
      );
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

  vNode = processVNode(vNode);

  if (!container._vNode) {
    container.appendChild(createElement__v2(vNode));
  } else {
    updateElement(vNode, container._vNode, container);
  }

  container._vNode = vNode;

  // 이벤트 위임 처리
  setupEventListeners(container);
}

function isTextNode(node) {
  return typeof node === "string" || typeof node === "number";
}
