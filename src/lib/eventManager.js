const eventMap = new Map();

let rootElement = null;

export function setupEventListeners(root) {
  rootElement = root;

  if (rootElement) {
    for (const [eventType] of eventMap) {
      rootElement.removeEventListener(eventType, handleEvent);
    }
  }
  for (const [eventType] of eventMap) {
    rootElement.addEventListener(eventType, handleEvent, true); // true: 캡처링 사용
  }
}

function handleEvent(event) {
  let target = event.target;

  while (target && target !== rootElement) {
    const handlers = eventMap.get(event.type);
    if (handlers) {
      const handler = handlers.get(target);
      if (handler) handler(event);
    }
    target = target.parentNode;
  }
}

export function addEvent(element, eventType, handler) {
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, new Map());
  }
  const handlers = eventMap.get(eventType);
  handlers.set(element, handler);

  if (rootElement) {
    rootElement.addEventListener(eventType, handleEvent, true);
  }
}

export function removeEvent(element, eventType, handler) {
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
