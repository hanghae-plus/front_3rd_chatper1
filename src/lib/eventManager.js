const eventMap = new Map();

// 이벤트 위임이 설정될 루트 요소
let rootElement = null;

export function setupEventListeners($root) {
  rootElement = $root;

  if (rootElement) {
    for (const eventType of eventMap.keys()) {
      // 기존에 등록되어 있던 이벤트 제거
      rootElement.removeEventListener(eventType, handleEvent, true);
      rootElement.addEventListener(eventType, handleEvent, true);
    }
  }
}

function handleEvent(event) {
  let target = event.target;

  if (!eventMap.has(event.type)) return;

  const handlers = eventMap.get(event.type);

  while (target && target !== rootElement) {
    const handler = handlers.get(target);
    if (handler) {
      handler(event);
      break;
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
}

export function removeEvent(element, eventType) {
  if (!eventMap.has(eventType)) {
    throw new Error(`eventMap에 ${eventType}이 존재하지 않습니다.`);
  }

  const handlers = eventMap.get(eventType);
  handlers.delete(element);

  if (handlers.size === 0) {
    eventMap.delete(eventType);
    rootElement?.removeEventListener(eventType, handleEvent, true);
  }
}
