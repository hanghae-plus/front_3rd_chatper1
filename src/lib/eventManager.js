const eventMap = new Map(); // Map(eventType, Map(element, handler))

let rootElement = null;

export function setupEventListeners(root) {
  rootElement = root;

  eventMap.forEach((_, eventType) => {
    removeEvent(rootElement, eventType);
    addEvent(rootElement, eventType, handleEvent);
  });
}

function handleEvent(event) {
  let target = event.target;
  const handlers = eventMap.get(event.type);

  if (!handlers) return;

  while (target && target !== rootElement) {
    console.log("target:", target);
    for (const [element, handler] of handlers) {
      if (typeof element === "object" && element === target) {
        handler(event);
        return;
      }
      if (typeof element === "string" && target.matches(element)) {
        handler(event);
        return;
      }
    }

    target = target.parentElement;
  }
}

export function addEvent(element, eventType, handler) {
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, new Map());
  }

  const handlers = eventMap.get(eventType);

  if (!handlers.has(element)) {
    handlers.set(element, handler);
  }

  if (rootElement) {
    rootElement.addEventListener(eventType, handleEvent, true);
  }
}

export function removeEvent(element, eventType, handler) {
  const handlers = eventMap.get(eventType);

  if (handlers) {
    handlers.delete(element);
  }

  if (handlers.size === 0) {
    eventMap.delete(eventType);

    if (rootElement) {
      rootElement.removeEventListener(eventType, handleEvent);
    }
  }
}
