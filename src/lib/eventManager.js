// eventManager.js

// 이벤트 위임을 위한 전역 이벤트 맵
const eventMap = new Map(); // 이벤트 타입별로 요소와 핸들러를 저장
let rootElement = null; // 이벤트 위임이 설정될 루트 요소

// 환경 변수 체크
const isDevelopment = process.env.NODE_ENV === "development";

// 루트 요소에 이벤트 위임을 설정하는 함수
export function setupEventListeners(root) {
  rootElement = root; // 1. rootElement 설정

  // 2. 기존 이벤트 리스너 제거 및 새로운 이벤트 리스너 추가
  Array.from(eventMap.keys()).forEach((eventType) => {
    removeEvent(rootElement, eventType); // 기존 이벤트 리스너 제거
    rootElement.addEventListener(eventType, handleEvent); // 새로운 이벤트 리스너 추가

    if (isDevelopment) {
      console.log(`이벤트 리스너 추가: ${eventType}`); // 디버깅 로그
    }
  });
}

// 실제 이벤트가 발생했을 때 호출되는 핸들러
function handleEvent(event) {
  const target = event.target; // 이벤트 발생한 요소
  const type = event.type; // 이벤트 타입

  // 1. 이벤트 타입에 해당하는 핸들러 가져오기
  const handlers = eventMap.get(type);
  if (handlers) {
    // 2. 핸들러 실행
    for (const [element, handler] of handlers) {
      // 타겟이 요소와 일치하는지 검사
      if (
        (typeof element === "object" && element === target) ||
        (typeof element === "string" && target.matches(element))
      ) {
        event.preventDefault(); // 기본 동작 방지

        if (isDevelopment) {
          console.log(`핸들러 실행: ${type}, 요소: ${target}`); // 디버깅 로그
        }

        handler(event); // 핸들러 실행
        break; // 핸들러가 실행된 후 반복 종료
      }
    }
  }
}

// 이벤트를 추가하는 함수
export function addEvent(element, eventType, handler) {
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, new Map()); // 새로운 이벤트 타입 추가

    if (isDevelopment) {
      console.log(`이벤트 타입 추가: ${eventType}`); // 디버깅 로그
    }
  }

  const handlers = eventMap.get(eventType);
  handlers.set(element, handler); // 핸들러 추가
}

// 이벤트를 제거하는 함수
export function removeEvent(element, eventType, handler) {
  const handlers = eventMap.get(eventType);
  if (handlers) {
    handlers.delete(element); // 특정 요소의 핸들러 제거
    if (handlers.size === 0) {
      eventMap.delete(eventType); // 이벤트 타입 제거
      // 루트 요소의 이벤트 리스너 제거
      if (rootElement) {
        rootElement.removeEventListener(eventType, handleEvent);
        if (isDevelopment) {
          console.log(`이벤트 리스너 제거: ${eventType}`); // 디버깅 로그
        }
      }
    }
  }
}
