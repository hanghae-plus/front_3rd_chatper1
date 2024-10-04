import {
  reactNamesToTopLevelEvents,
  topLevelEventsToReactNames,
} from "./DomEventProperties.js";

const eventMap = new Map();

let rootElement = null;

export function setupEventListeners(root) {
  rootElement = root;

  eventMap.forEach((handlers, eventType) => {
    rootElement.removeEventListener(eventType, handleEvent, true);
  });

  eventMap.forEach((handlers, eventType) => {
    rootElement.addEventListener(
      reactNamesToTopLevelEvents.get(eventType),
      handleEvent,
      true
    );
  });
}

function handleEvent(event) {
  let target = event.target;

  while (target && target !== rootElement) {
    const eventType = topLevelEventsToReactNames.get(event.type);
    const handlers = eventMap.get(eventType);

    if (!handlers) return;

    for (const { element, handler } of handlers) {
      element === target ? handler?.(event) : null;
    }

    target = target.parentNode;
  }
}

export function addEvent(element, eventType, handler) {
  const existing = eventMap.get(eventType);

  eventMap.set(eventType, [...(existing ?? []), { element, handler }]);

  if (!reactNamesToTopLevelEvents.has(eventType)) {
    rootElement.addEventListener(eventType, handleEvent, true);
  }
}

export function removeEvent(element, eventType, handler) {
  const handlers = eventMap.get(eventType);

  if (!handlers || handlers?.length === 0) {
    eventMap.delete(eventType);
    rootElement.removeEventListener(eventType, handleEvent, true);
    return;
  }

  eventMap.set(
    eventType,
    handlers.filter(
      ({ element: el, handler: h }) => el !== element || h !== handler
    )
  );
}
