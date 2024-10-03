const eventMap = new Map();

let rootElement = null;

export function setupEventListeners(root) {
  rootElement = root;
  eventMap.forEach((_, eventType) => {
    rootElement.removeEventListener(eventType, handleEvent);
  });
  eventMap.forEach((_, eventType) => {
    rootElement.addEventListener(eventType, handleEvent);
  });
}

function handleEvent(event) {
  let { target, type } = event;

  while (target) {
    const handleEventMap = eventMap.get(type);
    if (handleEventMap) {
      const handler = handleEventMap.get(target);
      if (handler) {
        handler.call(target, event);
      }
    }
    if (target === rootElement) {
      break;
    }

    target = target.parentElement;
  }
}

export function addEvent(element, eventType, handler) {
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, new Map());
    rootElement.addEventListener(eventType, handleEvent, true);
  }

  const eventHandler = eventMap.get(eventType);
  eventHandler.set(element, handler);
}

export function removeEvent(element, eventType) {
  const eventHandler = eventMap.get(eventType);
  eventHandler.delete(element);

  if (eventHandler.size === 0) {
    eventMap.delete(eventType);
    rootElement.removeEventListener(eventType, handleEvent);
  }
}
