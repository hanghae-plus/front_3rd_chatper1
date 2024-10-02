// eventManager.js

// 이벤트 위임을 위한 전역 이벤트 맵
// 이 맵은 이벤트 타입별로 요소와 해당 요소의 이벤트 핸들러를 저장합니다.
const eventMap = new Map();

// 이벤트 위임이 설정될 루트 요소
let rootElement = null;

export function setupEventListeners(container) {
  const handleEvent = (event) => {
    let target = event.target;
    const eventType = event.type;

    while (target && target !== container) {
      if (target.hasAttribute(`data-event-${eventType}`)) {
        const handler = target[`__${eventType}Handler`];
        if (handler) {
          handler.call(target, event);
        }
      }
      target = target.parentElement;
    }
  };

  ['click', 'input', 'change', 'submit'].forEach((eventType) => {
    container.addEventListener(eventType, handleEvent);
  });
}

export function addEvent(element, eventType, handler) {
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, new Map());
  }
  eventMap.get(eventType).set(element, handler);
}

export function removeEvent(element, eventType, handler) {
  if (eventMap.has(eventType)) {
    eventMap.get(eventType).delete(element);
  }
}
