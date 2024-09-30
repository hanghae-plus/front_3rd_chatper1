// 이벤트 위임을 위한 전역 이벤트 맵
// 이 맵은 이벤트 타입별로 요소와 해당 요소의 이벤트 핸들러를 저장합니다.
const eventMap = new Map();

// 이벤트 위임이 설정될 루트 요소
let rootElement = null;

/**
 * 루트 요소에 이벤트 위임을 설정합니다.
 * @param {HTMLElement} root - 이벤트를 위임할 루트 DOM 요소
 */
export function setupEventListeners(root) {
  // 이전에 설정된 루트 요소가 있으면 초기화
  if (rootElement) {
    eventMap.forEach((handlers, eventType) => {
      rootElement.removeEventListener(eventType, handleEvent);
    });
  }

  rootElement = root; // 새로운 루트 요소 설정
  eventMap.forEach((handlers, eventType) => {
    rootElement.addEventListener(eventType, handleEvent);
  });
}

/**
 * 실제 이벤트가 발생했을 때 호출되는 핸들러입니다.
 * @param {Event} event - 발생한 이벤트 객체
 */
function handleEvent(event) {
  const { type, target } = event;
  let currentTarget = target;

  // 루트 요소까지 버블링하며 이벤트 핸들러 실행
  while (currentTarget && currentTarget !== rootElement.parentNode) {
    if (eventMap.has(type)) {
      const handlers = eventMap.get(type).filter(handler => handler.element === currentTarget);
      handlers.forEach(handler => handler.handler(event));
    }
    currentTarget = currentTarget.parentNode;
  }
}

/**
 * 요소에 이벤트를 추가합니다.
 * @param {HTMLElement} element - 이벤트를 추가할 요소
 * @param {string} eventType - 이벤트 타입
 * @param {Function} handler - 이벤트 핸들러 함수
 */
export function addEvent(element, eventType, handler) {
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, []);
    if (rootElement) {
      rootElement.addEventListener(eventType, handleEvent);
    }
  }
  eventMap.get(eventType).push({ element, handler });
}

/**
 * 요소에서 이벤트를 제거합니다.
 * @param {HTMLElement} element - 이벤트를 제거할 요소
 * @param {string} eventType - 이벤트 타입
 * @param {Function} handler - 이벤트 핸들러 함수
 */
export function removeEvent(element, eventType, handler) {
  if (eventMap.has(eventType)) {
    const handlers = eventMap.get(eventType);
    const index = handlers.findIndex(h => h.element === element && h.handler === handler);
    if (index !== -1) {
      handlers.splice(index, 1);
    }
    if (handlers.length === 0) {
      eventMap.delete(eventType);
      if (rootElement) {
        rootElement.removeEventListener(eventType, handleEvent);
      }
    }
  }
}