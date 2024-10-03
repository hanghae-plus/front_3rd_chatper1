const eventMap = new Map();

// 이벤트 위임이 설정될 루트 요소
let rootElement = null;

export function setupEventListeners($root) {
  rootElement = $root;

  if (rootElement) {
    for (const eventType of eventMap.keys()) {
      rootElement.addEventListener(eventType, handleEvent, true);
    }
  }
}

function handleEvent(event) {
  let target = event.target;

  if (!eventMap.has(event.type)) return;

  const events = eventMap.get(event.type);

  while (target && target !== rootElement) {
    const eventObj = events.find(({ el }) => el === target);
    if (eventObj) {
      eventObj.handler(event);
      break;
    }

    target = target.parentNode;
  }
}

export function addEvent(element, eventType, handler) {
  const events = eventMap.get(eventType) || [];
  eventMap.set(eventType, [...events, { el: element, handler }]);
}

export function removeEvent(element, eventType, handler) {
  const events = eventMap.get(eventType) || [];
  const newEvents = events.filter(({ el }) => el !== element);

  if (newEvents.length > 0) {
    eventMap.set(eventType, newEvents);
  } else {
    eventMap.delete(eventType);
    if (rootElement) rootElement.removeEventListener(eventType, handleEvent, true);
  }
}
