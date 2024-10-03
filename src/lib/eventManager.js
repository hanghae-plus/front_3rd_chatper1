// eventManager.js

// 이벤트 위임을 위한 전역 이벤트 맵
// 이 맵은 이벤트 타입별로 요소와 해당 요소의 이벤트 핸들러를 저장합니다.
const eventMap = new Map();

// 이벤트 위임이 설정될 루트 요소
let rootElement = null;

// setupEventListeners 함수 구현
// 이 함수는 루트 요소에 이벤트 위임을 설정합니다.
export function setupEventListeners(root) {
  // 1. rootElement 설정
  if (rootElement) {
    // 2. 기존에 설정된 모든 이벤트 리스너 제거
    for (let eventType of eventMap.keys()) {
      rootElement.removeEventListener(eventType, handleEvent, true);
    }
  }

  // 새로운 루트 요소 설정
  rootElement = root;

  // 3. eventMap에 등록된 모든 이벤트 타입에 대해 루트 요소에 이벤트 리스너 추가
  for (let eventType of eventMap.keys()) {
    rootElement.addEventListener(eventType, handleEvent, true);
  }
}

// handleEvent 함수 구현
function handleEvent(event) {
  // 1. 이벤트 타겟에서 시작하여 루트 요소까지 버블링
  let targetElement = event.target;

  // 2. 각 요소에 대해 해당 이벤트 타입의 핸들러가 있는지 확인
  const eventType = event.type;
  while (targetElement && targetElement !== rootElement) {
    const handlers = eventMap.get(eventType);
    if (handlers) {
      handlers.forEach(({ element, handler }) => {
        if (element === targetElement) {
          // 3. 핸들러가 있다면 실행
          handler(event);
        }
      });
    }
    targetElement = targetElement.parentNode;
  }
}

// addEvent 함수 구현
export function addEvent(element, eventType, handler) {
  // 1. eventMap에 이벤트 타입과 요소, 핸들러 정보 저장
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, []);
    if (rootElement) {
      rootElement.addEventListener(eventType, handleEvent, true);
    }
  }

  eventMap.get(eventType).push({ element, handler });
}

// removeEvent 함수 구현
export function removeEvent(element, eventType, handler) {
  // 1. eventMap에서 해당 요소와 이벤트 타입에 대한 핸들러 제거
  if (eventMap.has(eventType)) {
    const handlers = eventMap.get(eventType);
    eventMap.set(
      eventType,
      handlers.filter((h) => !(h.element === element && h.handler === handler)),
    );

    // 2. 해당 이벤트 타입의 모든 핸들러가 제거되면 루트 요소의 리스너도 제거
    if (eventMap.get(eventType).length === 0) {
      rootElement.removeEventListener(eventType, handleEvent, true);
      eventMap.delete(eventType);
    }
  }
}
