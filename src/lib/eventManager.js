// eventManager.js

// 이벤트 위임을 위한 전역 이벤트 맵
// 이 맵은 이벤트 타입별로 요소와 해당 요소의 이벤트 핸들러를 저장합니다.
const eventMap = new Map();

// 이벤트 위임이 설정될 루트 요소
let rootElement = null;

export function setupEventListeners(root) {
  // 1. rootElement 설정
  rootElement = root;

  // 2. 기존에 설정된 이벤트 리스너 제거 (있다면)
  eventMap.forEach((_, eventType) => {
    rootElement.removeEventListener(eventType, handleEvent, true);
  });

  // 3. eventMap에 등록된 모든 이벤트 타입에 대해 루트 요소에 이벤트 리스너 추가
  eventMap.forEach((_, eventType) => {
    rootElement.addEventListener(eventType, handleEvent, true);
  });
}

function handleEvent(event) {
  const eventType = event.type;
  let target = event.target;

  // 1. 이벤트 타겟에서 시작하여 루트 요소까지 버블링
  while (target && target !== rootElement) {
    // 2. 각 요소에 대해 해당 이벤트 타입의 핸들러가 있는지 확인
    const elementHandlers = eventMap.get(eventType);
    if (elementHandlers && elementHandlers.has(target)) {
      // 3. 핸들러가 있다면 실행
      const handler = elementHandlers.get(target);
      handler.call(target, event);

      if (event.cancelBubble) break;
    }
    target = target.parentElement;
  }
}

export function addEvent(element, eventType, handler) {
  // 1. eventMap에 이벤트 타입과 요소, 핸들러 정보 저장
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, new Map());
  }
  eventMap.get(eventType).set(element, handler);

  // 2. 필요한 경우 루트 요소에 새 이벤트 리스너 추가
  if (rootElement && !rootElement.hasEventListener(eventType)) {
    rootElement.addEventListener(eventType, handleEvent, true);
  }
}

export function removeEvent(element, eventType, handler) {
  // 1. eventMap에서 해당 요소와 이벤트 타입에 대한 핸들러 제거
  if (eventMap.has(eventType)) {
    const elementHandlers = eventMap.get(eventType);
    if (elementHandlers.has(element)) {
      elementHandlers.delete(element);

      // 2. 해당 이벤트 타입의 모든 핸들러가 제거되면 루트 요소의 리스너도 제거
      if (elementHandlers.size === 0) {
        eventMap.delete(eventType);
        if (rootElement) {
          rootElement.removeEventListener(eventType, handleEvent, true);
        }
      }
    }
  }
}
