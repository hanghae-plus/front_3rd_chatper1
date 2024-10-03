// 이벤트 위임을 위한 전역 이벤트 맵
const eventMap = new Map();

let rootElement = null;

// setupEventListeners: 이 함수는 루트 요소에 이벤트 위임을 설정합니다.
export function setupEventListeners(root) {
  // 1. rootElement 설정
  rootElement = root;

  // 2. 기존에 설정된 이벤트 리스너 제거 (있다면)
  if (eventMap.size === 0) return;

  // 3. eventMap에 등록된 모든 이벤트 타입에 대해 루트 요소에 이벤트 리스너 추가
  for (const [eventType] of eventMap) {
    rootElement.removeEventListener(eventType, handleEvent, true);
    rootElement.addEventListener(eventType, handleEvent, true); // 이벤트 캡처링 단계에서 처리
  }
}

// handleEvent: 이 함수는 실제 이벤트가 발생했을 때 호출되는 핸들러입니다.
function handleEvent(event) {
  const { target, type } = event;

  // 1. eventMap에서 해당 이벤트 타입의 핸들러 목록을 가져옴
  const handlers = eventMap.get(type);
  if (!handlers) return;

  // 2. 이벤트 타겟에서 루트 요소까지 버블링하며 핸들러 실행
  for (const { element, handler } of handlers) {
    if (element === target || element.contains(target)) {
      handler(event);
    }
  }
}

// addEvent: 이 함수는 요소와 이벤트 타입에 대해 이벤트 핸들러를 등록합니다.
export function addEvent(element, eventType, handler) {
  // 1. eventMap에 이벤트 타입과 요소, 핸들러 정보 저장
  const handlers = eventMap.get(eventType) || [];

  // 같은 요소에 동일한 핸들러가 이미 등록되어 있으면 중복 방지
  const alreadyAdd = handlers.some(
    (item) => item.element === element && item.handler === handler
  );
  if (alreadyAdd) return;

  handlers.push({ element, handler });
  eventMap.set(eventType, handlers);

  // 2. 필요한 경우 루트 요소에 새 이벤트 리스너 추가
  if (rootElement) {
    rootElement.addEventListener(eventType, handleEvent, true);
  }
}

// removeEvent: 이 함수는 요소와 이벤트 타입에 대해 이벤트 핸들러를 제거합니다.
export function removeEvent(element, eventType) {
  // 1. eventMap에서 요소와 핸들러 제거
  const handlers = eventMap.get(eventType) || [];
  const updatedHandlers = handlers.filter((item) => item.element !== element);

  if (updatedHandlers.length > 0) {
    eventMap.set(eventType, updatedHandlers);
  } else {
    // 2. 해당 이벤트 타입의 모든 핸들러가 제거되면 eventMap에서 삭제 및 루트 리스너도 제거
    eventMap.delete(eventType);
    if (rootElement) {
      rootElement.removeEventListener(eventType, handleEvent, true);
    }
  }
}
