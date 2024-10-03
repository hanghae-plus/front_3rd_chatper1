// eventManager.js

// 이벤트 위임을 위한 전역 이벤트 맵
// 이 맵은 이벤트 타입별로 요소와 해당 요소의 이벤트 핸들러를 저장합니다.
const eventMap = new Map();

// 이벤트 위임이 설정될 루트 요소
let rootElement = null;

// TODO: setupEventListeners 함수 구현
// 이 함수는 루트 요소에 이벤트 위임을 설정합니다.
export function setupEventListeners(root) {
    if (rootElement && rootElement !== root) {
        for (const eventType of eventMap.keys()) {
            rootElement.removeEventListener(eventType, handleEvent);
        }
    }
    rootElement = root;
    if (rootElement) {
        for (const eventType of eventMap.keys()) {
            rootElement.addEventListener(eventType, handleEvent);
        }
    }
}

// TODO: handleEvent 함수 구현
// 이 함수는 실제 이벤트가 발생했을 때 호출되는 핸들러입니다.
function handleEvent(event) {
    const { target, type } = event;
    const handlerMap = eventMap.get(type);
    if (!handlerMap) return;

    let currentElement = target;
    while (currentElement && currentElement !== rootElement.parentNode) {
        if (handlerMap.has(currentElement)) {
            const handler = handlerMap.get(currentElement);
            handler.call(currentElement, event);
        }
        currentElement = currentElement.parentNode;
    }
}

// TODO: addEvent 함수 구현
export function addEvent(eventType, element, handler) {
    if (!eventMap.has(eventType)) {
        eventMap.set(eventType, new Map());
        if (rootElement) {
            rootElement.addEventListener(eventType, handleEvent);
        }
    }

    const handlerMap = eventMap.get(eventType);
    handlerMap.set(element, handler);
}

// TODO: removeEvent 함수 구현
export function removeEvent(element, eventType) {
    const handlerMap = eventMap.get(eventType);
    if (!handlerMap) {
        return;
    }

    handlerMap.delete(element);

    if (handlerMap.size === 0) {
        eventMap.delete(eventType);
        if (rootElement) {
            rootElement.removeEventListener(eventType, handleEvent);
        }
    }
}
