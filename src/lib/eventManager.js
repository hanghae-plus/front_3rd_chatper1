// eventManager.js

// 이벤트 위임을 위한 전역 이벤트 맵
// 이 맵은 이벤트 타입별로 요소와 해당 요소의 이벤트 핸들러를 저장합니다.
const eventMap = new Map();

// 이벤트 위임이 설정될 루트 요소
let rootElement = null;

// 루트 요소에 추가된 이벤트 리스너를 추적하는 Set

// TODO: setupEventListeners 함수 구현
// 이 함수는 루트 요소에 이벤트 위임을 설정합니다.
export function setupEventListeners(root) {
  // 1. rootElement 설정
  if(!root){
    return;
  }
  rootElement = root;

  // 2. 기존에 설정된 이벤트 리스너 제거 (있다면)
  if(eventMap.size>0){
    eventMap.forEach((_,eventType)=>{
      rootElement.removeEventListener(eventType, handleEvent, true);

    })
  }

  // 3. eventMap에 등록된 모든 이벤트 타입에 대해 루트 요소에 이벤트 리스너 추가
  // 주의: 이벤트 캡처링을 사용하여 이벤트를 상위에서 하위로 전파
  eventMap.forEach((_, eventType) => {
    rootElement.addEventListener(eventType, handleEvent, true);
  });
}

// TODO: handleEvent 함수 구현
// 이 함수는 실제 이벤트가 발생했을 때 호출되는 핸들러입니다.
  // 이를 통해 하위 요소에서 발생한 이벤트를 상위에서 효율적으로 처리할 수 있습니다.

function handleEvent(event) {
  const eventType = event.type;
  const handlers = eventMap.get(eventType) || []
  // 1. 이벤트 타겟에서 시작하여 루트 요소까지 버블링
  let currentElement = event.target;
  while (currentElement && currentElement !== rootElement){
 // 2. 각 요소에 대해 해당 이벤트 타입의 핸들러가 있는지 확인
    handlers.forEach(({element, handler}) => {
      if(currentElement === element){
        //핸들러가 있다면 실행
        // element.forEach(h => h.call(currentElement,event))
        handler.call(currentElement,event)
      }
    })
    currentElement = currentElement.parentElement;
  
  }

}

// TODO: addEvent 함수 구현
export function addEvent(element, eventType, handler) {
  if (!eventMap.has(eventType)) {
		eventMap.set(eventType, [{ element, handler }]);
		if (rootElement) rootElement.addEventListener(eventType, handleEvent, true);
	} else eventMap.get(eventType).push({ element, handler });
}

// TODO: removeEvent 함수 구현
export function removeEvent(element, eventType, handler) {
  let handlers = eventMap.get(eventType) || [];
	handlers = handlers.filter((h) => h.element !== element || h.handler !== handler);

	if (handlers.length === 0) {
		eventMap.delete(eventType);
		if (rootElement) rootElement.removeEventListener(eventType, handleEvent, true);
	} else eventMap.set(eventType, handlers);
  // 이를 통해 더 이상 필요 없는 이벤트 핸들러를 정리하고 메모리 누수 방지
}
