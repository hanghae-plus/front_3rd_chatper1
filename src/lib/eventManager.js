// eventManager.js

// 이벤트 위임을 위한 전역 이벤트 맵
// 이 맵은 이벤트 타입별로 요소와 해당 요소의 이벤트 핸들러를 저장합니다.
const eventMap = new Map();

// 이벤트 위임이 설정될 루트 요소
let rootElement = null;

// 이 함수는 루트 요소에 이벤트 위임을 설정합니다.
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
  // 주의: 이벤트 캡처링을 사용하여 이벤트를 상위에서 하위로 전파
}

// 이 함수는 실제 이벤트가 발생했을 때 호출되는 핸들러입니다.
function handleEvent(event) {
  let targetElement = event.target;

  while (targetElement && targetElement !== rootElement) {
    const handlers = eventMap.get(event.type);

    if (handlers) {
      const handler = handlers.get(targetElement);
      if (handler) {
        handler.call(targetElement, event);
      }
    }

    targetElement = targetElement.parentElement;
  }
}

export function addEvent(element, eventType, handler) {
  const hasEventType = eventMap.has(eventType);

  if (!hasEventType) {
    eventMap.set(eventType, new Map());
    if (rootElement) {
      rootElement.addEventListener(eventType, handleEvent, true);
    }
  }

  const handlers = eventMap.get(eventType);
  handlers.set(element, handler);
}

export function removeEvent(element, eventType, handler) {
  const hasEventType = eventMap.has(eventType);

  if (!hasEventType) return;

  const handlers = eventMap.get(eventType);
  if (handlers.has(element)) {
    handlers.delete(element);

    if (handlers.size === 0) {
      eventMap.delete(eventType);
      rootElement.removeEventListener(eventType, handleEvent, true);
    }
  }
}
