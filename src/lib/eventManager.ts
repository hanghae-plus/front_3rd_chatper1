// 이벤트 위임을 위한 전역 이벤트 맵
// 이 맵은 이벤트 타입별로 요소와 해당 요소의 이벤트 핸들러를 저장합니다.
const eventMap = new Map<string, Map<HTMLElement, EventListener>>();

// 이벤트 위임이 설정될 루트 요소
let rootElement: HTMLElement | null = null;

// TODO: setupEventListeners 함수 구현
// 이 함수는 루트 요소에 이벤트 위임을 설정합니다.
export function setupEventListeners(root: HTMLElement) {
  if (rootElement) {
    // 기존 루트 요소에 설정된 이벤트 리스너 제거
    eventMap.forEach((_, eventType) => {
      rootElement!.removeEventListener(eventType, handleEvent, true);
    });
  }

  rootElement = root;

  // 3. eventMap에 등록된 모든 이벤트 타입에 대해 루트 요소에 이벤트 리스너 추가
  // 주의: 이벤트 캡처링을 사용하여 이벤트를 상위에서 하위로 전파
  eventMap.forEach((_, eventType) => {
    rootElement!.addEventListener(eventType, handleEvent, true); // 캡처링 단계
  });
}

/** 이 함수는 실제 이벤트가 발생했을 때 호출되는 핸들러입니다. */
// 1. 이벤트 타겟에서 시작하여 루트 요소까지 버블링
// 2. 각 요소에 대해 해당 이벤트 타입의 핸들러가 있는지 확인
// 3. 핸들러가 있다면 실행
// 이를 통해 하위 요소에서 발생한 이벤트를 상위에서 효율적으로 처리할 수 있습니다.
function handleEvent(event: Event) {
  const { type, target } = event;

  if (!(target instanceof HTMLElement)) return;

  const handlers = eventMap.get(type);
  if (!handlers) return;

  let element: HTMLElement | null = target;

  // 이벤트 타겟에서 시작하여 루트 요소까지 버블링하면서 핸들러를 찾음
  while (element && element !== rootElement) {
    const handlerEntry = handlers.get(element);
    if (handlerEntry) {
      handlerEntry(event);
      return; // 첫 번째 핸들러만 실행 (이벤트 중복 방지)
    }
    element = element.parentElement; // 부모 요소로 버블링
  }
}

// TODO: addEvent 함수 구현
// 이 함수를 통해 개별 요소에 직접 이벤트를 붙이지 않고도 이벤트 처리 가능
export function addEvent(
  element: HTMLElement,
  eventType: string,
  handler: EventListener
) {
  // 1. eventMap에 이벤트 타입과 요소, 핸들러 정보 저장
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, new Map());

    // 2. 필요한 경우 루트 요소에 새 이벤트 리스너 추가
    rootElement?.addEventListener(eventType, handleEvent, true);
  }

  const handlers = eventMap.get(eventType)!;
  handlers.set(element, handler);
}

// TODO: removeEvent 함수 구현
export function removeEvent(
  element: HTMLElement,
  eventType: string,
  handler: EventListener
) {
  // 1. eventMap에서 해당 요소와 이벤트 타입에 대한 핸들러 제거
  const handlerMap = eventMap.get(eventType);
  if (handlerMap) {
    handlerMap.delete(element);

    // 2. 해당 이벤트 타입의 모든 핸들러가 제거되면 루트 요소의 리스너도 제거
    // 이를 통해 더 이상 필요 없는 이벤트 핸들러를 정리하고 메모리 누수 방지
    if (handlerMap.size === 0) {
      eventMap.delete(eventType);
      rootElement?.removeEventListener(eventType, handleEvent, true);
    }
  }
}
