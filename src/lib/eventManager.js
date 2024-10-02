// eventManager.js

// 이벤트 위임을 위한 전역 이벤트 맵
// 이 맵은 이벤트 타입별로 요소와 해당 요소의 이벤트 핸들러를 저장합니다.
const eventMap = new Map();

// 이벤트 위임이 설정될 루트 요소
let rootElement = null;

// TODO: setupEventListeners 함수 구현
// 이 함수는 루트 요소에 이벤트 위임을 설정합니다.
export function setupEventListeners(root) {
  // 1. rootElement 설정
  rootElement = root;

  // 2. 기존에 설정된 이벤트 리스너 제거 (있다면)
  if (rootElement && eventMap.size > 0) {
    eventMap.forEach((_, eventType) => {
      rootElement.removeEventListener(eventType, handleEvent, true);
    });
  }

  // 3. eventMap에 등록된 모든 이벤트 타입에 대해 루트 요소에 이벤트 리스너 추가
  for (let [eventType] of eventMap) {
    rootElement.addEventListener(eventType, handleEvent, true); // 이벤트 캡처링 단계에서 처리
  }
  // 주의: 이벤트 캡처링을 사용하여 이벤트를 상위에서 하위로 전파
}

// TODO: handleEvent 함수 구현
// 이 함수는 실제 이벤트가 발생했을 때 호출되는 핸들러입니다.
function handleEvent(event) {
  // 1. 이벤트 타겟에서 시작하여 루트 요소까지 버블링
  let targetElement = event.target;
  // 2. 각 요소에 대해 해당 이벤트 타입의 핸들러가 있는지 확인
  while (targetElement && targetElement !== rootElement) {
    const handlers = eventMap.get(event.type);

    if (handlers) {
      // 요소가 등록되어 있는지 확인
      const handler = handlers.get(targetElement);
      if (handler) {
        console.log(handler, 'handle');
        // 3. 핸들러가 있다면 실행
        handler.call(targetElement, event);
        break; // 첫 번째로 매칭된 핸들러만 실행
      }
    }

    // 부모 요소로 이동
    targetElement = targetElement.parentElement;
  }
  // 이를 통해 하위 요소에서 발생한 이벤트를 상위에서 효율적으로 처리할 수 있습니다.
}

// TODO: addEvent 함수 구현
export function addEvent(element, eventType, handler) {
  // 1. eventMap에 이벤트 타입과 요소, 핸들러 정보 저장
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, new Map());
  }

  const handlers = eventMap.get(eventType);

  // 같은 요소에 대한 같은 이벤트 타입이 존재하는 경우, 기존 핸들러 덮어쓰기
  if (handlers.has(element)) {
    handlers.set(element, handler);
    return;
  }

  // 새로운 핸들러 추가
  handlers.set(element, handler);

  // 2. 필요한 경우 루트 요소에 새 이벤트 리스너 추가
  if (rootElement && handlers.size === 1) {
    // 해당 이벤트 타입에 대한 리스너가 처음 추가되는 경우에만 리스너 추가
    rootElement.addEventListener(eventType, handleEvent, true);
  }
}

// TODO: removeEvent 함수 구현
export function removeEvent(element, eventType, handler) {
  // 1. eventMap에서 해당 요소와 이벤트 타입에 대한 핸들러 제거
  const handlers = eventMap.get(eventType);

  if (handlers) {
    const registeredHandler = handlers.get(element);

    // 2. 해당 핸들러가 등록된 경우에만 제거
    if (registeredHandler === handler) {
      handlers.delete(element); // 해당 핸들러만 삭제

      // 3. 해당 이벤트 타입의 모든 핸들러가 제거되면 리스너도 제거
      if (handlers.size === 0) {
        eventMap.delete(eventType);
        if (rootElement) {
          rootElement.removeEventListener(eventType, handleEvent, true);
        }
      }
    }
  }
  // 이를 통해 더 이상 필요 없는 이벤트 핸들러를 정리하고 메모리 누수 방지
}
