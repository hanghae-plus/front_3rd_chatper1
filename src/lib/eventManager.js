// eventManager.js

const eventMap = new Map();

let rootElement = null;

export function setupEventListeners(root) {
  rootElement = root;

  rootElement.removeEventListener('click', handleEvent, true);

  eventMap.forEach((handlers, eventType) => {
    rootElement.addEventListener(eventType, handleEvent, true);
  });
}

function handleEvent(event) {
  let target = event.target;

  while (target && target !== rootElement) {
    const handlers = eventMap.get(event.type);

    if (handlers) {
      for (const { element, handler } of handlers) {
        if (element === target || element.contains(target)) {
          handler.call(element, event);
        }
      }
    }
    target = target.parentNode;
  }
}

export function addEvent(element, eventType, handler) {
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, []);
    if (rootElement) {
      rootElement.addEventListener(eventType, handleEvent, true);
    }
  }
  eventMap.get(eventType).push({ element, handler });
}

export function removeEvent(element, eventType, handler) {
  const handlers = eventMap.get(eventType);

  if (handlers) {
    const index = handlers.findIndex(
      (h) => h.element === element && h.handler === handler
    );

    if (index !== -1) {
      handlers.splice(index, 1);
      if (handlers.length === 0) {
        eventMap.delete(eventType);
        if (rootElement) {
          rootElement.removeEventListener(eventType, handleEvent, true);
        }
      }
    }
  }
}
