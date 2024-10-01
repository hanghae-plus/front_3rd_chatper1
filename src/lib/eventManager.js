const eventMap = new Map();

let rootElement = null;

export function setupEventListeners(root) {
  rootElement = root;
  if (eventMap.size <= 0) return;
  for (const [eventType] of eventMap) {
    rootElement.removeEventListener(eventType, handleEvent, true);
    rootElement.addEventListener(eventType, handleEvent, true);
  }
}

function handleEvent(e) {
  const { target, type } = e;
  const handlers = eventMap.get(type);
  for (const { element, handler } of handlers) {
    if (element === target) {
      handler(e);
      break;
    }
  }
}

export function addEvent(element, eventType, handler) {
  const eventList = eventMap.get(eventType) || [];
  const existedEventList = eventList.filter((item) => item.element === element);

  if (existedEventList.length > 0) return;
  eventList.push({ element, handler });
  eventMap.set(eventType, eventList);
}

export function removeEvent(element, eventType) {
  const eventList = eventMap.get(eventType);
  const filteredEventList = eventList.filter((item) => item.element !== element);

  eventMap.set(eventType, filteredEventList);
}
