// eventManager.js

// 이벤트 위임을 위한 전역 이벤트 맵
// 이 맵은 이벤트 타입별로 요소와 해당 요소의 이벤트 핸들러를 저장합니다.
const eventMap = new Map();

// 이벤트 위임이 설정될 루트 요소
let rootElement = null;

// 루트 요소에 추가된 이벤트 리스너를 추적하는 Set
const addedEventTypes = new Set();

// TODO: setupEventListeners 함수 구현
// 이 함수는 루트 요소에 이벤트 위임을 설정합니다.
export function setupEventListeners(root) {
  // 1. rootElement 설정
  rootElement = typeof root === 'string' ? document.querySelector(root) : root;
  if(!rootElement){
    return;
  }
  // 2. 기존에 설정된 이벤트 리스너 제거 (있다면)
  addedEventTypes.forEach((eventType) => {
    rootElement.removeEventListener(eventType, handleEvent, true);
  });
  addedEventTypes.clear();
  // 3. eventMap에 등록된 모든 이벤트 타입에 대해 루트 요소에 이벤트 리스너 추가
  // 주의: 이벤트 캡처링을 사용하여 이벤트를 상위에서 하위로 전파
  eventMap.forEach((_, eventType) => {
    rootElement.addEventListener(eventType, handleEvent, true);
    addedEventTypes.add(eventType);
  });
}

// TODO: handleEvent 함수 구현
// 이 함수는 실제 이벤트가 발생했을 때 호출되는 핸들러입니다.
  // 이를 통해 하위 요소에서 발생한 이벤트를 상위에서 효율적으로 처리할 수 있습니다.

function handleEvent(event) {
  const eventType = event.type;
  const handlers = eventMap.get(eventType)
  if(!handlers) return;
  // 1. 이벤트 타겟에서 시작하여 루트 요소까지 버블링
  let currentElement = event.target;
  while (currentElement && currentElement !== rootElement.parentElement){
 // 2. 각 요소에 대해 해당 이벤트 타입의 핸들러가 있는지 확인
    handlers.forEach((handlerInfo, selector) => {
      if(currentElement.matches(selector)){
        //핸들러가 있다면 실행
        handlerInfo.forEach(handler => handler.call(currentElement,event))
      }
    })
    currentElement = currentElement.parentElement;
  
  }

}

// TODO: addEvent 함수 구현
export function addEvent(element, eventType, handler) {
  // 1. eventMap에 이벤트 타입과 요소, 핸들러 정보 저장
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, new Map());
  }

  const handlersForType = eventMap.get(eventType);
  const selector = getUniqueSelector(element);
  
  if (!handlersForType.has(selector)) {
    handlersForType.set(selector, new Set());
  }
  
  handlersForType.get(selector).add(handler);

// 2. 필요한 경우 루트 요소에 새 이벤트 리스너 추가
if (rootElement && !rootElement.hasEventListener(eventType)) {
  rootElement.addEventListener(eventType, handleEvent, true);
}
  // 이 함수를 통해 개별 요소에 직접 이벤트를 붙이지 않고도 이벤트 처리 가능
}

// TODO: removeEvent 함수 구현
export function removeEvent(element, eventType, handler) {
  // 1. eventMap에서 해당 요소와 이벤트 타입에 대한 핸들러 제거
  if (!eventMap.has(eventType)) return;

  const handlersForType = eventMap.get(eventType);
  const selector = getUniqueSelector(element);

  if (!handlersForType.has(selector)) return;

  const handlers = handlersForType.get(selector);
  handlers.delete(handler);

   // 해당 요소의 모든 핸들러가 제거되면 선택자 entry 삭제
   if (handlers.size === 0) {
    handlersForType.delete(selector);
  }


  // 2. 해당 이벤트 타입의 모든 핸들러가 제거되면 루트 요소의 리스너도 제거
  if (handlersForType.size === 0) {
    eventMap.delete(eventType);
    if (rootElement && rootElement.hasEventListener(eventType)) {
      rootElement.removeEventListener(eventType, handleEvent, true);
      rootElement[`__has_${eventType}`] = false;
    }
  }
  // 이를 통해 더 이상 필요 없는 이벤트 핸들러를 정리하고 메모리 누수 방지
}
