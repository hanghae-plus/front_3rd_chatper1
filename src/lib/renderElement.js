// renderElement.js
import { addEvent, removeEvent, setupEventListeners } from './eventManager';
import { createElement__v2 } from "./createElement__v2.js";

// TODO: processVNode 함수 구현
// vNode를 처리하여 렌더링 가능한 형태로 변환합니다.
function processVNode(vNode) {
  // - null, undefined, boolean 값 처리
  if(!vNode) {
    return '';
  }
  // - 문자열과 숫자를 문자열로 변환
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    return String(vNode);
  }
  // - 함수형 컴포넌트 처리 <---- 이게 제일 중요합니다.
  if (typeof vNode.type === 'function') {
    console.log(vNode)
    return processVNode(vNode.type(vNode.props));
  }
  // - 자식 요소들에 대해 재귀적으로 processVNode 호출
  if (Array.isArray(vNode)) {
    return vNode.map(processVNode);
  }
  return vNode;
}

// TODO: updateAttributes 함수 구현
// DOM 요소의 속성을 업데이트합니다.
function updateAttributes(targetEl, newVNodeProps, oldNodeProps) {
// - 새로운 props의 속성 추가 또는 업데이트
console.log(newVNodeProps)
  Object.entries(newVNodeProps || {}).forEach(([attr, value]) => {
    if (attr.startsWith('on')) {
      const eventType = attr.slice(2).toLowerCase();
      // 이전 핸들러가 있을 경우, 같은 핸들러는 제거하지 않음
      if (oldNodeProps[attr] !== value) {
        if (oldNodeProps[attr]) {
          removeEvent(targetEl, eventType, oldNodeProps[attr]); // 기존 이벤트 리스너 제거
        }
        addEvent(targetEl, eventType, value); // 새로운 이벤트 리스너 추가
      }
    } else if (attr === 'className') {
      targetEl.className = value;
    } else if (attr === 'style') {
      Object.assign(targetEl.style, value); // 스타일 업데이트
    } else {
      targetEl.setAttribute(attr, value); // 일반 속성 처리
    }
  });

  // - 이전 props에서 제거된 속성 처리
  // Object.keys(oldNodeProps || {}).forEach(attr => {
  //   if (!(attr in newVNodeProps)) {
  //     if (attr.startsWith('on')) {
  //       const eventType = attr.slice(2).toLowerCase();
  //       removeEvent(targetEl, eventType, oldNodeProps[attr]); // 이벤트 핸들러 제거
  //     } else {
  //       targetEl.removeAttribute(attr); // 일반 속성 제거
  //     }
  //   }
  // });
}

// TODO: updateElement 함수 구현
function updateElement(container, newVNode, oldNode, index = 0) {
  // 1. 노드 제거 (newVNode가 없고 oldNode가 있는 경우)
  // TODO: oldNode만 존재하는 경우, 해당 노드를 DOM에서 제거
  if(!newVNode && oldNode){
    return container.removeChild(container.childNodes[index]);
  }
  // 2. 새 노드 추가 (newVNode가 있고 oldNode가 없는 경우)
  // TODO: newVNode만 존재하는 경우, 새 노드를 생성하여 DOM에 추가
  if(newVNode && !oldNode){
    return container.appendChild(createElement__v2(newVNode));
  }

  // 3. 텍스트 노드 업데이트
  // TODO: newVNode와 oldNode가 둘 다 문자열 또는 숫자인 경우
  // TODO: 내용이 다르면 텍스트 노드 업데이트
  if (typeof newVNode === 'string' || typeof newVNode === 'number') {
    if (typeof oldNode === 'string' || typeof oldNode === 'number') {
      if (newVNode !== oldNode) {
        container.childNodes[index].textContent = String(newVNode);
      }
      return; // 텍스트가 같으면 그대로 유지
    } else {
      return container.replaceChild(createElement__v2(newVNode), container.childNodes[index]);
    }
  }

  // 4. 노드 교체 (newVNode와 oldNode의 타입이 다른 경우)
  if(newVNode.type !== oldNode.type){
    // TODO: 타입이 다른 경우, 이전 노드를 제거하고 새 노드로 교체
    return container.replaceChild(createElement__v2(newVNode),container.childNodes[index]);
    
  }
  // console.log('container.childNodes[index],newVNode.props,oldNode.props',processVNode(newVNode),container.childNodes[index],newVNode.props,oldNode.props)
  // 5. 같은 타입의 노드 업데이트 newVNode.type === oldNode.type
  // 5-1. 속성 업데이트
  // TODO: updateAttributes 함수를 호출하여 속성 업데이트
  updateAttributes(container.childNodes[index],newVNode.props,processVNode(oldNode).props);

  const newVNodeChild = newVNode.children || [];
  const oldNodeChild = oldNode.children || [];
  const maxLengthChild = Math.max(newVNodeChild.length,oldNodeChild.length);
    // 5-2. 자식 노드 재귀적 업데이트
    // // TODO: newVNode와 oldNode의 자식 노드들을 비교하며 재귀적으로 updateElement 호출
    // // HINT: 최대 자식 수를 기준으로 루프를 돌며 업데이트
    for (let i = 0; i < maxLengthChild; i++) {
      if (newVNodeChild[i]) {
        // 새로운 노드가 있고, 해당 인덱스에 기존 노드가 있으면 업데이트
        updateElement(container.childNodes[index], newVNodeChild[i], oldNodeChild[i], i);
      } else if (oldNodeChild[i]) {
        // 새로운 노드가 없고, 기존 노드만 있으면 제거
        container.childNodes[index].removeChild(container.childNodes[index].childNodes[i]);
      }
    }
    // // 5-3. 불필요한 자식 노드 제거
    // // TODO: oldNode의 자식 수가 더 많은 경우, 남은 자식 노드들을 제거
  while (oldNodeChild.length > newVNodeChild.length) {
  // while (container.firstChild.childNodes.length > newChildren.length) {
    container.firstChild.removeChild(container.firstChild.lastChild);
  }
}


// TODO: renderElement 함수 구현
export function renderElement(vNode, container) {
  // 최상위 수준의 렌더링 함수입니다.
  const oldNode = container.__vNode; // 이전 vNode 저장
  const newVNode = processVNode(vNode); // 새로 들어온 vNode 처리
  // - 이전 vNode와 새로운 vNode를 비교하여 업데이트
  console.log('renderElement',newVNode,oldNode)
  
  // - 최초 렌더링과 업데이트 렌더링 처리
  updateElement(container, newVNode ,oldNode); // 업데이트 또는 추가
  container.__vNode = newVNode; // 새 vNode 저장
  // 이벤트 위임 설정
  // TODO: 렌더링이 완료된 후 setupEventListeners 함수를 호출하세요.
  setupEventListeners(container);
  // 이는 루트 컨테이너에 이벤트 위임을 설정하여 모든 하위 요소의 이벤트를 효율적으로 관리합니다.
}
