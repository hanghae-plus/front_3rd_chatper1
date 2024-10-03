const eventMap = new Map();
let rootElement = null;

// 이벤트 리스너 설정 함수
// root 요소에 대한 이벤트 리스너를 설정하고 기존 리스너를 제거합니다.
export function setupEventListeners(root) {
  if (rootElement && rootElement !== root) {
    removeAllEventListeners();
  }
  rootElement = root;
  addAllEventListeners();
}

// 모든 이벤트 리스너 제거 함수
// rootElement에 등록된 모든 이벤트 리스너를 제거합니다.
function removeAllEventListeners() {
  eventMap.forEach((_, eventType) => {
    rootElement.removeEventListener(eventType, handleEvent);
  });
}

// 모든 이벤트 리스너 추가 함수
// eventMap에 등록된 모든 이벤트 타입에 대해 리스너를 추가합니다.
function addAllEventListeners() {
  eventMap.forEach((_, eventType) => {
    rootElement.addEventListener(eventType, handleEvent);
  });
}

// 이벤트 핸들러 함수
// 이벤트가 발생했을 때 실행되며, 이벤트 타겟부터 루트 요소까지 버블링하며 핸들러를 찾아 실행합니다.
function handleEvent(event) {
  const { target, type } = event;
  const handlerMap = eventMap.get(type);

  if (!handlerMap) return;

  let currentTarget = target;
  while (currentTarget && currentTarget !== rootElement.parentNode) {
    const handler = handlerMap.get(currentTarget);
    if (handler) {
      handler(event);
    }
    currentTarget = currentTarget.parentNode;
  }
}

// 이벤트 추가 함수
// 특정 요소에 대한 이벤트 핸들러를 등록합니다.
export function addEvent(eventType, element, handler) {
  const handlerMap = eventMap.get(eventType) || new Map();

  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, handlerMap);
    rootElement?.addEventListener(eventType, handleEvent);
  }

  handlerMap.set(element, handler);
}

// 이벤트 제거 함수
// 특정 요소에 대한 이벤트 핸들러를 제거합니다.
export function removeEvent(element, eventType) {
  const handlerMap = eventMap.get(eventType);

  if (!handlerMap) return;

  handlerMap.delete(element);

  if (handlerMap.size === 0) {
    eventMap.delete(eventType);
    rootElement?.removeEventListener(eventType, handleEvent);
  }
}
