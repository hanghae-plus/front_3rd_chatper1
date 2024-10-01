// eventManager.js

// 이벤트 위임을 위한 전역 이벤트 맵
// 이 맵은 이벤트 타입별로 요소와 해당 요소의 이벤트 핸들러를 저장합니다.
const eventMap = new Map();

// 이벤트 위임이 설정될 루트 요소
let rootElement = null;

// TODO: setupEventListeners 함수 구현
// 이 함수는 루트 요소에 이벤트 위임을 설정합니다.
export function setupEventListeners(root) {
  if (!root || !(root instanceof Element)) {
    throw new Error("루트 요소가 올바르지 않습니다.");
  }

  if (rootElement) {
    eventMap.forEach((_, eventType) => {
      rootElement.removeEventListener(eventType, handleEvent, true);
    });
  }

  rootElement = root;

  eventMap.forEach((_, eventType) => {
    rootElement.addEventListener(eventType, handleEvent, true);
  });
}

// TODO: handleEvent 함수 구현
// 이 함수는 실제 이벤트가 발생했을 때 호출되는 핸들러입니다.
function handleEvent(event) {
  const { target, type } = event;

  const handlers = eventMap.get(type);
  if (!handlers) return;

  let currentElement = target;

  while (currentElement && currentElement !== document.body) {
    if (currentElement.classList.contains("delegate-event")) {
      const elementHandlers = handlers.get(currentElement);
      if (elementHandlers) {
        elementHandlers.forEach((handler) => {
          try {
            handler.call(currentElement, event);
          } catch (error) {
            console.error("Error in event handler:", error);
          }
        });
      }
    }
    currentElement = currentElement.parentElement;
  }
}

// TODO: addEvent 함수 구현
export function addEvent(element, eventType, handler) {
  if (!(element instanceof Element)) {
    throw new Error("요소가 X");
  }
  if (typeof eventType !== "string") {
    throw new Error("이벤트 타입 X");
  }
  if (typeof handler !== "function") {
    throw new Error("핸들러 X");
  }

  if (!window.eventMap) {
    window.eventMap = new Map();
  }

  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, new Map());
    document.body.addEventListener(eventType, handleEvent, true);
  }

  const elementMap = eventMap.get(eventType);

  if (!elementMap.has(element)) {
    elementMap.set(element, []);
  }

  const handlers = elementMap.get(element); //  해당 요소의 핸들러 목록

  if (!handlers.includes(handler)) {
    //  중복 핸들러 등록 방지
    handlers.push(handler);
  }
  element.classList.add("delegate-event");
}

// TODO: removeEvent 함수 구현
export function removeEvent(element, eventType, handler) {
  if (!(element instanceof Element)) {
    throw new Error("Invalid element provided");
  }
  if (typeof eventType !== "string") {
    throw new Error("Invalid event type");
  }
  if (typeof handler !== "function") {
    throw new Error("Invalid event handler");
  }

  if (!window.eventMap || !eventMap.has(eventType)) return;

  const elementMap = eventMap.get(eventType);
  if (!elementMap.has(element)) return;

  const handlers = elementMap.get(element);
  const index = handlers.indexOf(handler);

  if (index !== -1) {
    handlers.splice(index, 1);
    if (handlers.length === 0) {
      elementMap.delete(element);
      element.classList.remove("delegate-event");
    }
    if (elementMap.size === 0) {
      eventMap.delete(eventType);
      if (rootElement) {
        rootElement.removeEventListener(eventType, handleEvent, true);
      }
    }
  }
}
