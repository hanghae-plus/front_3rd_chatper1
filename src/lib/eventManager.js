// eventManager.js

// 이벤트 위임을 위한 전역 이벤트 맵
// 이벤트 타입별로 요소와 해당 요소의 이벤트 핸들러를 저장합니다.
const eventMap = new Map();

// 이벤트 위임이 설정될 루트 요소
let rootElement = null;

// TODO: setupEventListeners 함수 구현
export function setupEventListeners(root) {
  // 1. rootElement 설정
  rootElement = root;

  // 2. 기존에 설정된 이벤트 리스너 제거 (있다면)
  rootElement.removeEventListener('click', handleEvent, true); // 예: 클릭 이벤트
  rootElement.removeEventListener('mouseover', handleEvent, true); // 예: 마우스오버 이벤트
  // 3. eventMap에 등록된 모든 이벤트 타입에 대해 루트 요소에 이벤트 리스너 추가
  for (let [eventType] of eventMap) {
    rootElement.addEventListener(eventType, handleEvent, true); // 이벤트 캡처링 단계에서 처리
  }
}

// TODO: handleEvent 함수 구현

function handleEvent(event) {
  const { type, target } = event; // 이벤트 타입과 타겟 요소

  // 1. 이벤트 타겟에서 시작하여 루트 요소까지 버블링
  let currentElement = target;
  console.log('handleEvent',target,event)
  // 2. 각 요소에 대해 해당 이벤트 타입의 핸들러가 있는지 확인
  while (currentElement && currentElement !== rootElement) {
    const handlers = eventMap.get(type);
  console.log('handlers',handlers)

    if (handlers) {
  console.log('handlerInfo',handlers.get(currentElement))

      const handlerInfo = handlers.get(currentElement);
      if (handlerInfo) {
        handlerInfo.forEach(handler => {
          console.log(handler)
          // 3. 핸들러가 있으면 실행
          // event.preventDefault();
          handler(event);
          // createSyntheticEvent(event);
          // handler(createSyntheticEvent(event));
        });
        break; // 이벤트 버블링 중단
      }
    }

    // 상위 요소로 버블링
    currentElement = currentElement.parentElement;
  }
}

// TODO: addEvent 함수 구현
export function addEvent(element, eventType, handler) {
  // 1. eventMap에 이벤트 타입과 요소, 핸들러 정보 저장
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, new Map());
  }
  console.log('addEvent element',element)
  console.log('addEvent eventType', eventType, )
  console.log('addEvent handler',handler)
  const eventHandlers = eventMap.get(eventType);

  if (!eventHandlers.has(element)) {
    eventHandlers.set(element, []);
  }

  eventHandlers.get(element).push(handler);
  // 2. 필요한 경우 루트 요소에 새 이벤트 리스너 추가
  if (!rootElement) {
    console.warn('Root element is not set. Call setupEventListeners first.');
  } 
  else if (!eventMap.has(eventType)) {
    element.addEventListener(eventType, handler, true);
  }
}

// TODO: removeEvent 함수 구현
export function removeEvent(element, eventType, handler) {
  // 1. eventMap에서 해당 요소와 이벤트 타입에 대한 핸들러 제거
  const eventHandlers = eventMap.get(eventType);
  if (eventHandlers) {
    const handlersForElement = eventHandlers.get(element);

    console.log('remove',handlersForElement)
    if (handlersForElement) {
      const handlerIndex = handlersForElement.indexOf(handler);
      if (handlerIndex !== -1) {
        handlersForElement.splice(handlerIndex, 1);
      }

      // 2. 해당 이벤트 타입의 모든 핸들러가 제거되면 루트 요소의 리스너도 제거
      if (handlersForElement.length === 0) {
        eventHandlers.delete(element);
      }

      // 만약 해당 이벤트 타입의 모든 요소가 없어지면 eventMap에서 삭제
      if (eventHandlers.size === 0) {
        eventMap.delete(eventType);
        rootElement.removeEventListener(eventType, handleEvent, true);
      }
    }
  }
}
