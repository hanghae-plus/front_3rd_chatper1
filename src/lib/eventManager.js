const eventMap = new Map();

let rootElement = null;

/**
 * @function setupEventListeners
 * @terms 루트 요소에 이벤트 위임을 설정
 * @desc 기존에 설정된 이벤트 리스너가 있다면 제거하고, 
 * eventMap에 등록된 모든 이벤트 타입에 대해 새로운 루트 요소에 이벤트 리스너를 추가
 * 이벤트 캡처링을 사용하여 이벤트를 상위에서 하위로 전파
 * 
 * @param {HTMLElement} root - 이벤트를 위임할 루트 DOM 요소
 */

export function setupEventListeners(root) {
  if (rootElement && rootElement !== root) {
    eventMap.forEach((_, eventType) => {
      rootElement.removeEventListener(eventType, handleEvent);
    });
  }
  rootElement = root;
  eventMap.forEach((_, eventType) => {
    rootElement.addEventListener(eventType, handleEvent);
  });
}

/**
 * @function handleEvent
 * @terms 실제 이벤트가 발생했을 때 호출되는 핸들러
 * @desc 이벤트 타겟에서 시작하여 루트 요소까지 버블링하면서 이벤트 핸들러를 검색하고 실행
 * 
 * @param {Event} event - 발생한 이벤트 객체
 */

function handleEvent(event) {
  let currentTarget = event.target;
  while (currentTarget && currentTarget !== rootElement.parentNode) {
    if (eventMap.has(event.type)) {
      const handlers = eventMap.get(event.type).filter(handler => handler.element === currentTarget);
      handlers.forEach(handler => handler.handler(event));
    }
    currentTarget = currentTarget.parentNode;
  }
}

/**
 * @function addEvent
 * @terms 지정된 요소와 이벤트 유형에 이벤트 핸들러를 추가
 * @desc eventMap에 이벤트 타입과 요소, 핸들러 정보를 저장
 * 루트 요소에 새 이벤트 리스너를 추가합
 * 개별 요소에 직접 이벤트를 붙이지 않고도 이벤트 처리 가능
 * 
 * @param {HTMLElement} element - 이벤트를 추가할 요소
 * @param {string} eventType - 이벤트 타입
 * @param {Function} handler - 이벤트 핸들러 함수
 */

export function addEvent(element, eventType, handler) {
  let eventList = eventMap.get(eventType);
  if (!eventList) {
    eventList = [];
    eventMap.set(eventType, eventList);
    if (rootElement) {
      rootElement.addEventListener(eventType, handleEvent);
    }
  }
  if (!eventList.some(item => item.element === element && item.handler === handler)) {
    eventList.push({ element, handler });
  }
}

/**
 * @function removeEvent 
 * @terms 지정된 요소에서 특정 이벤트 타입의 핸들러를 제거
 * @desc eventMap에서 해당 요소와 이벤트 타입에 대한 핸들러 제거,
 * 해당 이벤트 타입의 모든 핸들러가 제거되면 루트 요소의 리스너도 제거
 * 더 이상 필요 없는 이벤트 핸들러를 정리
 * 
 * @param {HTMLElement} element - 이벤트를 제거할 요소
 * @param {string} eventType - 이벤트 타입
 */

export function removeEvent(element, eventType) {
  const eventList = eventMap.get(eventType);
  const filteredEventList = eventList.filter((item) => item.element !== element);

  eventMap.set(eventType, filteredEventList);
}