const eventMap = new Map();
let rootElement = null;

export const setupEventListeners = (root) => {
  rootElement = root;

  if (rootElement) {
    eventMap.forEach((_, eventType) => {
      rootElement.removeEventListener(eventType, handleEvent, true);
      rootElement.addEventListener(eventType, handleEvent, true);
    });
  }
};

const handleEvent = (event) => {
  let target = event.target;

  while (target && target !== rootElement) {
    const handlers = eventMap.get(event.type);
    if (handlers) {
      const handler = handlers.get(target);
      if (handler) {
        handler(event);
      }
    }
    target = target.parentNode;
  }
};

export const addEvent = (element, eventType, handler) => {
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, new Map());
    if (rootElement) {
      rootElement.addEventListener(eventType, handleEvent, true);
    }
  }

  const handlers = eventMap.get(eventType);
  handlers.set(element, handler);
};

export const removeEvent = (element, eventType, handler) => {
  const handlers = eventMap.get(eventType);
  if (handlers && handlers.get(element) === handler) {
    handlers.delete(element);

    if (handlers.size === 0) {
      eventMap.delete(eventType);
      if (rootElement) {
        rootElement.removeEventListener(eventType, handleEvent, true);
      }
    }
  }
};
