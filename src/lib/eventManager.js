const eventMap = new Map();

let rootElement = null;

export function setupEventListeners(root) {
  rootElement = root;

  eventMap.forEach((_, eventType) => {
    rootElement.removeEventListener(eventType, handleEvent, true);
  });

  eventMap.forEach((_, eventType) => {
    rootElement.addEventListener(eventType, handleEvent, true);
  });
}

function handleEvent(event) {
  let target = event.target;

  while (target && target !== rootElement) {
    const handlers = eventMap.get(event.type);
    if (handlers && handlers.has(target)) {
      handlers.get(target)(event);
    }
    target = target.parentElement;
  }
}

export function addEvent(element, eventType, handler) {
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, new Map());
    rootElement.addEventListener(eventType, handleEvent, true);
  }

  const handlers = eventMap.get(eventType);
  handlers.set(element, handler);
}

export function removeEvent(element, eventType, handler) {
  if (!eventMap.has(eventType)) return;

  const handlers = eventMap.get(eventType);
  handlers.delete(element);

  if (handlers.size === 0) {
    eventMap.delete(eventType);
    rootElement.removeEventListener(eventType, handleEvent, true);
  }
}
