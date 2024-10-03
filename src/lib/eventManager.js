// 이벤트 위임을 위한 전역 이벤트 맵
// 이 맵은 이벤트 타입별로 요소와 해당 요소의 이벤트 핸들러를 저장합니다.
export const eventMap = new Map();

let rootElement = null;

export function setupEventListeners(root) {
  rootElement = root;
  if (rootElement) {
    eventMap.forEach((handlers, eventType) => {
      rootElement.removeEventListener(eventType, handleEvent);
    });
  }
  eventMap.forEach((handlers, eventType) => {
    rootElement.addEventListener(eventType, handleEvent);
  });
}

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
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, new Map());
    if (rootElement) {
      rootElement.addEventListener(eventType, handleEvent);
    }
  }

  const handlers = eventMap.get(eventType);
  handlers.set(element, handler);
}

export function removeEvent(element, eventType) {
  const handlers = eventMap.get(eventType);
  if (handlers) {
    handlers.delete(element);
    if (handlers.size === 0) {
      eventMap.delete(eventType);
      if (rootElement) {
        rootElement.removeEventListener(eventType, handleEvent);
      }
    }
  }
}
