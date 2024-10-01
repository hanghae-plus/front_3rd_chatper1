// renderElement.js
import { addEvent, removeEvent, setupEventListeners } from './eventManager';
import { createElement__v2 } from "./createElement__v2.js";
let previousVNode = null;


// TODO: processVNode 함수 구현
function processVNode(vNode) {
  // vNode를 처리하여 렌더링 가능한 형태로 변환합니다.
  // - null, undefined, boolean 값 처리
  // - 문자열과 숫자를 문자열로 변환
  // - 함수형 컴포넌트 처리 <---- 이게 제일 중요합니다.
  // - 자식 요소들에 대해 재귀적으로 processVNode 호출
  if(vNode == null || typeof vNode == 'boolean'){
    return '';
  }
  if (typeof vNode === 'string' || typeof vNode ==='number'){
    return String(vNode);
  }

  if(typeof vNode.type === 'function'){
    const props = vNode.props ||{};
    const componentResult = vNode.type(props);
    return processVNode(componentResult);
  }

  if(typeof vNode === 'object'){
    const processedChildren = Array.isArray(vNode.children)? vNode.children.map(processVNode):[];
    return {
      ...vNode,
      children:processedChildren
    };
  }
  //예상치 못한 타입의 경우, 원래 vNode를 반환
  return vNode;
}

// TODO: updateAttributes 함수 구현
function updateAttributes(element, newProps, oldProps = {}) {

  // DOM 요소의 속성을 업데이트합니다.
  //   <이벤트 리스너 처리>
  //     - TODO: 'on'으로 시작하는 속성을 이벤트 리스너로 처리
  //     - 주의: 직접 addEventListener를 사용하지 않고, eventManager의 addEvent와 removeEvent 함수를 사용하세요.
  //     - 이는 이벤트 위임을 통해 효율적으로 이벤트를 관리하기 위함입니다.
  // - 이전 props에서 제거된 속성 처리
  for ( const key in oldProps){
    if(newProps === null){
      return;
    }
  if(!(key in newProps)){
    if(key.startsWith('on')){
      const eventName = key.toLowerCase().substring(2);
      removeEvent(element, eventName, oldProps[key]);
    }  // - 이벤트 리스너, className, style 등 특별한 경우 처리
    else if (key === 'className'){
      element.className = '';
    }else if(key === 'style'){
      element.removeAttribute('style');
    }else{
      element.removeAttribute(key)
    }
  }
}

  // - 새로운 props의 속성 추가 또는 업데이트
  for(const key in newProps) {
    if(oldProps[key] !== newProps[key]){
      if(key.startsWith('on')){
        const eventName = key.toLowerCase().substring(2);
        //oldProps에 키가 있지만 값이 변경된 경우 
        if(oldProps[key]){
          removeEvent(element,eventName,oldProps[key]);
        }
        addEvent(element, eventName, newProps[key]);
      }
        // - 이벤트 리스너, className, style 등 특별한 경우 처리
      else if(key === 'className'){
        element.className = newProps[key];
      }else if(key === 'style'){
        if(typeof newProps[key] === 'string'){
          element.style.cssText = newProps[key];
        }else {
          for (const styleKey in newProps[key]){
            element.style[styleKey] = newProps[key][styleKey];
          }
        }
      }else if(key === 'value'){
        //input, textarea 등의 value 속성 특별 처리 
        element.value = newProps[key];
      }else {
        //일반적인 속성 처리
        if(newProps[key] === true){
          element.setAttribute(key,'');
        }else if(newProps[key] === false || newProps[key]){
          element.removeAttribute([key]);
        }else {
           element.setAttribute(key,newProps[key])
        }
      }
    }
  }

}

// TODO: updateElement 함수 구현
function updateElement(parentNode, newNode, oldNode, index = 0) {
  // 기존 자식 노드 가져오기 (없으면 undefined)
  const childNode = parentNode.childNodes[index];

  // 1. 노드 제거 (newNode가 없고 oldNode가 있는 경우)
  if (!newNode && oldNode && childNode) {
    parentNode.removeChild(childNode);
    return;
  }

  // 2. 새 노드 추가 (newNode가 있고 oldNode가 없는 경우)
  if (newNode && !oldNode) {
    parentNode.appendChild(createElement__v2(newNode));
    return;
  }

  // 3. 텍스트 노드 업데이트
  if (typeof newNode === 'string' || typeof newNode === 'number') {
    if (childNode && childNode.nodeType === Node.TEXT_NODE) {
      // 기존 텍스트 노드 업데이트
      childNode.textContent = newNode;
    } else {
      // 새 텍스트 노드 생성 및 추가/교체
      const newTextNode = document.createTextNode(String(newNode));
      if (childNode) {
        parentNode.replaceChild(newTextNode, childNode);
      } else {
        parentNode.appendChild(newTextNode);
      }
    }
    return;
  }

  // 4. 노드 교체 또는 업데이트
  if (!childNode || (newNode.type !== oldNode.type)) {
    const newElement = createElement__v2(newNode);
    if (childNode) {
      parentNode.replaceChild(newElement, childNode);
    } else {
      parentNode.appendChild(newElement);
    }
  } else {
    // 5. 같은 타입의 노드 업데이트
    updateAttributes(childNode, newNode.props, oldNode.props);
    
    // 자식 노드 재귀적 업데이트
    const newChildren = newNode.children || [];
    const oldChildren = oldNode.children || [];
    const maxLength = Math.max(newChildren.length, oldChildren.length);
    
    for (let i = 0; i < maxLength; i++) {
      updateElement(
        childNode,
        newChildren[i],
        oldChildren[i],
        i
      );
    }

    // 불필요한 자식 노드 제거
    while (childNode.childNodes.length > newChildren.length) {
      childNode.removeChild(childNode.lastChild);
    }
  }
}

// TODO: renderElement 함수 구현
export function renderElement(vNode, container) {
  // 최상위 수준의 렌더링 함수입니다.
  // - 이전 vNode와 새로운 vNode를 비교하여 업데이트
  // - 최초 렌더링과 업데이트 렌더링 처리
  const processedVNode = processVNode(vNode);

  if (!previousVNode) {
    // 최초 렌더링
    const element = createElement__v2(processedVNode);
    container.appendChild(element);
  } else {
    // 업데이트 렌더링
    updateElement(container, processedVNode, previousVNode);
  }
  // 현재 vNode를 다음 비교를 위해 저장
  previousVNode = processedVNode;


  // 이벤트 위임 설정
  // TODO: 렌더링이 완료된 후 setupEventListeners 함수를 호출하세요.
  // 이는 루트 컨테이너에 이벤트 위임을 설정하여 모든 하위 요소의 이벤트를 효율적으로 관리합니다.
  setupEventListeners(container);
}

