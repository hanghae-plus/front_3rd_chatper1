const eventMap = new Map<string, Map<HTMLElement, EventListener>>();

let $rootElement: HTMLElement | null = null;

export const isEventListenerKey = (key: string) => key.startsWith('on');
export const extractEventType = (key: string) =>
  key.replace(/^on/, '').toLowerCase() as keyof HTMLElementEventMap;

/**
 * 이벤트 위임을 위해 루트 요소에 이벤트 리스너를 설정합니다.
 * 기존의 루트 요소에 등록된 리스너는 제거되고, 새로운 루트 요소에 리스너가 추가됩니다.
 *
 * @param {HTMLElement} $newRoot - 새로운 루트 요소
 */
export function setupEventListeners($newRoot: HTMLElement) {
  if ($rootElement) {
    removeEventListeners($rootElement);
  }

  $rootElement = $newRoot;
  addEventListeners($rootElement);

  // ---------- 내부함수 ----------
  function removeEventListeners($root: HTMLElement) {
    eventMap.forEach((_, eventType) => {
      $root.removeEventListener(eventType, handleEvent, true);
    });
  }

  function addEventListeners($root: HTMLElement) {
    eventMap.forEach((_, eventType) => {
      $root.addEventListener(eventType, handleEvent, true);
    });
  }
}

/**
 * 이벤트를 처리하고, 관련 핸들러가 있으면 실행합니다.
 * 이벤트는 타겟 요소에서부터 루트 요소로 버블링됩니다.
 *
 * @param {Event} event - 발생한 이벤트 객체
 */
function handleEvent(event: Event) {
  const { type, target } = event;

  if (!(target instanceof HTMLElement)) return;

  const handler = findEventHandler(target, type as keyof HTMLElementEventMap);
  if (handler) {
    handler(event);
  }

  // ---------- 내부함수 ----------
  function findEventHandler(
    $target: HTMLElement,
    eventType: keyof HTMLElementEventMap
  ): EventListener | null {
    const handlers = eventMap.get(eventType);
    if (!handlers) return null;

    let $element: HTMLElement | null = $target;

    // 타겟에서 시작하여 루트 요소까지 버블링하며 핸들러를 탐색
    while ($element && $element !== $rootElement) {
      const handler = handlers.get($element);
      if (handler) return handler;
      $element = $element.parentElement; // 부모 요소로 버블링
    }

    return null;
  }
}

/**
 * 지정된 요소에 대해 주어진 이벤트 타입에 대한 이벤트 핸들러를 추가하고,
 * 이벤트 핸들러를 eventMap에 저장합니다.
 *
 * @param {HTMLElement} $element - 이벤트를 추가할 HTML 요소
 * @param {keyof HTMLElementEventMap} eventType - 이벤트 타입 (예: 'click', 'mouseover')
 * @param {EventListener} handler - 이벤트 발생 시 실행될 핸들러 함수
 */
export function addEvent(
  $element: HTMLElement,
  eventType: keyof HTMLElementEventMap,
  handler: EventListener
) {
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, new Map());
    $rootElement?.addEventListener(eventType, handleEvent, true);
  }

  const handlers = eventMap.get(eventType)!;
  handlers.set($element, handler);
}

/**
 * 지정된 요소에서 주어진 이벤트 타입에 대한 이벤트 핸들러를 제거합니다.
 * 이벤트 핸들러가 모두 제거되면 루트 요소의 이벤트 리스너도 함께 제거됩니다.
 *
 * @param {HTMLElement} $element - 이벤트 핸들러를 제거할 HTML 요소
 * @param {string} eventType - 제거할 이벤트 타입 (예: 'click', 'mouseover')
 */
export function removeEvent(
  $element: HTMLElement,
  eventType: keyof HTMLElementEventMap
) {
  const handlerMap = eventMap.get(eventType);
  if (handlerMap) {
    handlerMap.delete($element);

    if (handlerMap.size === 0) {
      eventMap.delete(eventType);
      $rootElement?.removeEventListener(eventType, handleEvent, true);
    }
  }
}
