// eventManager.js

// 이벤트 위임을 위한 전역 이벤트 맵
// 이 맵은 이벤트 타입별로 요소와 해당 요소의 이벤트 핸들러를 저장합니다.
const eventMap = new Map();

// 이벤트 위임이 설정될 루트 요소
let rootElement = null;

function handleRootEvent(evnetType, action) {
  if (!rootElement) return;
  if (action === "add") {
    rootElement.addEventListener(evnetType, handleEvent, false);
  } else if (action === "remove") {
    rootElement.removeEventListener(evnetType, handleEvent, false);
  }
}

// TODO: setupEventListeners 함수 구현
// 이 함수는 루트 요소에 이벤트 위임을 설정합니다.
export function setupEventListeners(root) {
  if (!root || !(root instanceof Element)) {
    throw new Error("루트 요소 X");
  }

  if (rootElement) {
    eventMap.forEach((_, eventType) => {
      handleRootEvent(eventType, "remove");
    });
  }

  rootElement = root;

  eventMap.forEach((_, eventType) => {
    handleRootEvent(eventType, "add");
  });
}

function handleEvent(event) {
  const { target, type } = event;
  const handlers = eventMap.get(type);

  if (!handlers) return;

  let currentElement = target;

  while (currentElement && currentElement !== rootElement.parentElement) {
    if (handlers.has(currentElement)) {
      const handler = handlers.get(currentElement);
      handler.call(currentElement, event);
    }
    currentElement = currentElement.parentElement;
  }
}

// TODO: addEvent 함수 구현
export function addEvent(element, eventType, handler) {
  if (!element || !(element instanceof Element)) {
    throw new Error("요소가 없음");
  }
  if (typeof eventType !== "string") {
    throw new Error("event type이 유효하지 않음");
  }
  if (typeof handler !== "function") {
    throw new Error("handler가 유효하지 않음");
  }
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, new Map());
    handleRootEvent(eventType, "add");
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
    handleRootEvent(eventType, "remove");
  }
}
