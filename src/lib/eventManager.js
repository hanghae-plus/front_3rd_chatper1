// 이벤트 위임을 위한 전역 이벤트 맵
// 이 맵은 이벤트 타입별로 요소와 해당 요소의 이벤트 핸들러를 저장합니다.
const eventMap = new Map();

// 이벤트 위임이 설정될 루트 요소
let rootElement = null;

/**
 * 루트 요소에 이벤트 위임을 설정하는 함수입니다.
 * 
 * @param {HTMLElement} root - 이벤트 위임이 적용될 루트 DOM 요소
 * 
 * 이 함수는 다음과 같은 작업을 수행합니다:
 * 1. 기존에 설정된 루트 요소가 변경되었는지 확인합니다. 기존과 동일한 루트라면 중복 설정을 방지하기 위해 바로 리턴합니다.
 * 2. 기존에 설정된 모든 이벤트 리스너를 제거합니다. rootElement가 이미 존재하는 경우, 해당 요소에 등록된 모든 이벤트 리스너를 제거합니다.
 * 3. 새로운 루트 요소를 설정하고, eventMap에 등록된 모든 이벤트 타입에 대해 이벤트 리스너를 추가합니다. 이벤트 캡처링을 사용하여 이벤트를 상위에서 하위로 전파합니다.
 */
export function setupEventListeners(root) {
  if (root === rootElement) return; // 이미 설정된 rootElement와 동일하면 종료

  if (rootElement) {
    // 기존에 설정된 모든 이벤트 리스너 제거
    for (const eventType of eventMap.keys()) {
      rootElement.removeEventListener(eventType, handleEvent, true);
    }
  }

  rootElement = root;

  // 새로운 루트 요소에 이벤트 리스너 추가
  for (const eventType of eventMap.keys()) {
    rootElement.addEventListener(eventType, handleEvent, true);
  }
}

/**
 * 발생한 이벤트를 처리하는 함수입니다.
 * 
 * @param {Event} event - 발생한 이벤트 객체
 * 
 * 이 함수는 이벤트가 발생한 타겟에서 시작해 루트 요소까지 버블링되면서
 * 해당 이벤트 타입에 맞는 핸들러가 있는지 확인하고 실행합니다.
 * 
 * 이 함수는 다음과 같은 작업을 수행합니다:
 * 1. 이벤트 타입이 eventMap에 등록되어 있는지 확인합니다. 없으면 바로 종료합니다.
 * 2. 이벤트 타겟에서 루트 요소까지 버블링되면서 해당 요소에 등록된 이벤트 핸들러가 있으면 실행합니다.
 */
function handleEvent(event) {
  const { target, type } = event;

  // 이벤트 맵에 해당 이벤트 타입이 없다면 종료
  if (!eventMap.has(type)) return;

  let currentElement = target;

  // 이벤트가 타겟에서 루트로 버블링되는 동안 이벤트 핸들러를 실행
  while (currentElement && currentElement !== rootElement) {
    const handlersForEvent = eventMap.get(type);
    if (handlersForEvent && handlersForEvent.has(currentElement)) {
      for (const handler of handlersForEvent.get(currentElement)) {
        handler(event); // 등록된 핸들러 실행
      }
    }
    currentElement = currentElement.parentNode;
  }
}

/**
 * 이벤트 핸들러를 등록하는 함수입니다.
 * 특정 DOM 요소에 이벤트 핸들러를 저장합니다.
 * 
 * @param {HTMLElement} element - 이벤트를 처리할 DOM 요소
 * @param {string} eventType - 이벤트 타입 (예: 'click', 'mouseover')
 * @param {function} handler - 실행할 이벤트 핸들러 함수
 * 
 * 이 함수는 다음과 같은 작업을 수행합니다:
 * 1. 해당 이벤트 타입이 eventMap에 없으면 새로운 Map을 추가하고, rootElement에 이벤트 리스너를 등록합니다.
 * 2. 해당 DOM 요소에 이벤트 핸들러가 이미 등록되어 있지 않다면, 새로 배열을 생성하여 등록합니다.
 * 3. 해당 DOM 요소에 핸들러를 추가합니다.
 */
export function addEvent(element, eventType, handler) {
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, new Map());
    if (rootElement) {
      rootElement.addEventListener(eventType, handleEvent, true);
    }
  }

  const handlersForEvent = eventMap.get(eventType);

  if (!handlersForEvent.has(element)) {
    handlersForEvent.set(element, [handler]);  // 새로운 핸들러 목록 등록
    return;
  }

  const handlers = handlersForEvent.get(element);
  if (handlers.includes(handler)) return;  // 중복된 핸들러라면 종료

  handlers.push(handler);  // 중복이 아니라면 핸들러 추가
}


/**
 * 이벤트 핸들러를 제거하는 함수입니다.
 * 
 * @param {HTMLElement} element - 이벤트가 등록된 DOM 요소
 * @param {string} eventType - 제거할 이벤트 타입 (예: 'click', 'mouseover')
 * @param {function} handler - 제거할 이벤트 핸들러 함수
 * 
 * 이 함수는 다음과 같은 작업을 수행합니다:
 * 1. 해당 이벤트 타입이 eventMap에 없으면 바로 종료합니다.
 * 2. 해당 DOM 요소에 등록된 핸들러 목록이 없다면 종료합니다.
 * 3. 핸들러 목록에서 해당 핸들러를 제거합니다. 만약 핸들러가 모두 제거되었다면, 해당 DOM 요소의 핸들러 목록을 삭제합니다.
 * 4. 이벤트 타입에 더 이상 등록된 핸들러가 없으면, eventMap에서 해당 이벤트 타입을 제거하고 rootElement에서 이벤트 리스너를 제거합니다.
 */
export function removeEvent(element, eventType, handler) {
  const handlersForEvent = eventMap.get(eventType);
  if (!handlersForEvent) return;  // 해당 이벤트 타입이 없으면 종료

  const handlers = handlersForEvent.get(element);
  if (!handlers) return;  // 해당 요소에 등록된 핸들러가 없으면 종료

  // 이벤트 핸들러 목록에서 제거
  const filteredHandlers = handlers.filter(h => h !== handler);
  if (filteredHandlers.length) {
    handlersForEvent.set(element, filteredHandlers);
  } else {
    handlersForEvent.delete(element); // 요소에 등록된 핸들러가 없으면 삭제
  }

  // 이벤트 타입에 더 이상 핸들러가 없으면 rootElement에서 이벤트 리스너도 제거
  if (!handlersForEvent.size) {
    eventMap.delete(eventType);
    rootElement?.removeEventListener(eventType, handleEvent, true);
  }
}