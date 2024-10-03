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
  // ====================================================================

  // null, undefined, boolean 값 처리
  if (vNode == null || typeof vNode === 'boolean') {
    return '';
  }

  // 문자열과 숫자를 문자열로 변환
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return String(vNode);
  }

  // 함수형 컴포넌트 처리
  if (typeof vNode.type === 'function') {
    return processVNode(
      vNode.type({ ...vNode.props, children: vNode.children })
    );
  }

  // 자식 요소들에 대해 재귀적으로 processVNode 호출
  if (Array.isArray(vNode)) {
    return vNode.flat(Infinity).map(processVNode).filter(Boolean);
  }
  return {
    ...vNode,
    children: Array.isArray(vNode.children)
      ? vNode.children.flat(Infinity).map(processVNode).filter(Boolean)
      : [],
  };
}

// TODO: updateAttributes 함수 구현
function updateAttributes($target, newProps, oldProps) {
  // DOM 요소의 속성을 업데이트합니다.
  // - 이전 props에서 제거된 속성 처리
  // - 새로운 props의 속성 추가 또는 업데이트
  // - 이벤트 리스너, className, style 등 특별한 경우 처리
  //   <이벤트 리스너 처리>
  //     - TODO: 'on'으로 시작하는 속성을 이벤트 리스너로 처리
  //     - 주의: 직접 addEventListener를 사용하지 않고, eventManager의 addEvent와 removeEvent 함수를 사용하세요.
  //     - 이는 이벤트 위임을 통해 효율적으로 이벤트를 관리하기 위함입니다.
  // ====================================================================

  newProps = newProps || {};
  oldProps = oldProps || {};
  const props = Object.assign({}, newProps, oldProps);

  Object.keys(props).forEach((name) => {
    if (name === 'children') return;
    if (Object.is(newProps[name], oldProps[name])) return; // type이 object, function 일 경우 통과

    if (name.startsWith('on') && typeof props[name] === 'function') {
      // 이벤트 리스너 처리
      const eventType = name.toLowerCase().substring(2);
      if (oldProps[name]) removeEvent($target, eventType, oldProps[name]);
      if (newProps[name]) addEvent($target, eventType, newProps[name]);
    } else if (name === 'className') {
      // className 처리
      if (name in newProps) $target.setAttribute('class', newProps[name]);
      else $target.removeAttribute('class');
    } else if (name === 'style') {
      // style 처리
      if (!name in newProps) {
        $target.removeAttribute('style');
        return;
      }
      const newStyle = newProps[name] || {};
      const oldStyle = oldProps[name] || {};
      const styles = Object.assign({}, newStyle, oldStyle);
      Object.keys(styles).forEach(key => {
        if (newStyle[key] !== oldStyle[key])
          $target.style[key] = newStyle[key] ?? '';
      });

    } else {
      if (name in newProps) $target.setAttribute(name, newProps[name]);
      else $target.removeAttribute(name);
    }
  });
}

// TODO: updateElement 함수 구현
function updateElement($parent, newNode, oldNode, index = 0) {
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
  // ====================================================================

  // 1. 노드 제거 (newNode가 없고 oldNode가 있는 경우)
  // 노드가 없는 경우 처리
  if (!oldNode && !newNode) return;
  // newNode가 없고 oldNode가 있는 경우
  if (!newNode) {
    $parent.removeChild($parent.childNodes[index]);
    return;
  }

  // 2. 새 노드 추가 (newNode가 있고 oldNode가 없는 경우)
  // TODO: newNode만 존재하는 경우, 새 노드를 생성하여 DOM에 추가
  if (!oldNode) {
    $parent.appendChild(createElement__v2(newNode));
    return;
  }

  // 3. 텍스트 노드 업데이트
  // TODO: newNode와 oldNode가 둘 다 문자열 또는 숫자인 경우
  // TODO: 내용이 다르면 텍스트 노드 업데이트
  if (
    (typeof newNode === 'string' || typeof newNode === 'number') &&
    (typeof oldNode === 'string' || typeof oldNode === 'number')
  ) {
    if (newNode !== oldNode) {
      $parent.childNodes[index].nodeValue = newNode;
    }
    return;
  }

  // 4. 노드 교체 (newNode와 oldNode의 타입이 다른 경우)
  // TODO: 타입이 다른 경우, 이전 노드를 제거하고 새 노드로 교체
  if (newNode.type !== oldNode.type) {
    $parent.replaceChild(createElement__v2(newNode), $parent.childNodes[index]);
    return;
  }

  // 5. 같은 타입의 노드 업데이트
  const $element = $parent.childNodes[index];
  // 5-1. 속성 업데이트
  // TODO: updateAttributes 함수를 호출하여 속성 업데이트
  updateAttributes($element, newNode.props, oldNode.props);

  // 5-2. 자식 노드 재귀적 업데이트
  // TODO: newNode와 oldNode의 자식 노드들을 비교하며 재귀적으로 updateElement 호출
  // HINT: 최대 자식 수를 기준으로 루프를 돌며 업데이트
  const newChildren = newNode.children || [];
  const oldChildren = oldNode.children || [];
  const maxLength = Math.max(newChildren.length, oldChildren.length);

  for (let i = 0; i < maxLength; i++) {
    updateElement($element, newChildren[i], oldChildren[i], i);
  }

  // 5-3. 불필요한 자식 노드 제거
  // TODO: oldNode의 자식 수가 더 많은 경우, 남은 자식 노드들을 제거
  while ($element.childNodes.length > newChildren.length) {
    $element.removeChild($element.lastChild);
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
  // ====================================================================

  if (!container) return;

  const processedVNode = processVNode(vNode);

  // 이전 vNode와 새로운 vNode를 비교하여 업데이트
  if (container._vNode) {
    // 업데이트 렌더링
    updateElement(container, processedVNode, container._vNode);
  } else {
    // 최초 렌더링
    container.appendChild(createElement__v2(processedVNode));
  }

  // 새로운 vNode를 컨테이너에 저장 (다음 렌더링에서 비교를 위해)
  container._vNode = processedVNode;

  // 이벤트 위임 설정
  // 렌더링이 완료된 후 setupEventListeners 함수를 호출
  setupEventListeners(container);
}
