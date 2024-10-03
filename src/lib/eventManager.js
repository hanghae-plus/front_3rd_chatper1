// eventManager.js

// 이벤트 위임을 위한 전역 이벤트 맵
// 이 맵은 이벤트 타입별로 요소와 해당 요소의 이벤트 핸들러를 저장합니다.
const eventMap = new Map();
// 이벤트 위임이 설정될 루트 요소
let rootElement = null;
// setupEventListeners: 이 함수는 루트 요소에 이벤트 위임을 설정합니다.
export function setupEventListeners(root) {
  rootElement = root;

  // 기존에 설정된 이벤트 리스너가 있다면 제거 후 새로 추가
  if (rootElement) {
    eventMap.forEach((_, eventType) => {
      rootElement.removeEventListener(eventType, handleEvent);
      rootElement.addEventListener(eventType, handleEvent, true); // 캡처링 단계에서 처리
    });
  }
}

// handleEvent 함수 구현
// 이 함수는 실제 이벤트가 발생했을 때 호출되는 핸들러입니다.
// 1. 이벤트 타겟에서 시작하여 루트 요소까지 버블링
// 2. 각 요소에 대해 해당 이벤트 타입의 핸들러가 있는지 확인
// 3. 핸들러가 있다면 실행
// 이를 통해 하위 요소에서 발생한 이벤트를 상위에서 효율적으로 처리할 수 있습니다.
function handleEvent(event) {
  let target = event.target; // 이벤트가 발생한 요소
  const eventType = event.type; // 발생한 이벤트의 타입

  while (target && target !== rootElement) {
    const handlers = eventMap.get(eventType); // 해당 이벤트 타입의 핸들러 목록
    if (handlers) {
      // 현재 타겟에 등록된 핸들러가 있는지 확인
      const elementHandlers = handlers.filter(
        (handler) => handler.element === target
      );
      if (elementHandlers.length > 0) {
        // 등록된 핸들러가 있다면 실행
        elementHandlers.forEach((h) => h.handler(event));
      }
    }
    target = target.parentNode; // 상위 요소로 이동
  }
}
// addEvent: 요소와 이벤트 타입에 대해 이벤트 핸들러를 등록합니다.
export function addEvent(element, eventType, handler) {
  const handlers = eventMap.get(eventType) || [];

  // 중복된 핸들러가 이미 있는지 확인하고, 없으면 추가
  const filterHandler = handlers.filter(
    (h) => h.element === element && h.handler === handler
  );
  if (filterHandler.length === 0) {
    handlers.push({ element, handler });
    eventMap.set(eventType, handlers);

    // 이벤트를 루트 요소에만 한 번 추가 (한 번만 등록되도록)
    if (rootElement) {
      rootElement.addEventListener(eventType, handleEvent, true); // 이벤트 캡처링 단계
    }
  }
}
// removeEvent: 요소와 이벤트 타입에 대해 이벤트 핸들러를 제거합니다.
export function removeEvent(element, eventType, handler) {
  const handlers = eventMap.get(eventType) || [];

  const updatedHandlers = handlers.filter(
    (h) => h.element !== element || h.handler !== handler
  );

  if (updatedHandlers.length > 0) {
    eventMap.set(eventType, updatedHandlers);
  } else {
    eventMap.delete(eventType);
    if (rootElement) {
      rootElement.removeEventListener(eventType, handleEvent, true);
    }
  }
}
