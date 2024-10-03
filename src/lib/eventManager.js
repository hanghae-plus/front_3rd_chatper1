// 이벤트 위임을 위한 전역 이벤트 맵
// 이 맵은 이벤트 타입별로 요소와 해당 요소의 이벤트 핸들러를 저장합니다.
const eventMap = new Map()

// 이벤트 위임이 설정될 루트 요소
let rootElement = null

// setupEventListeners 함수 구현
// 이 함수는 루트 요소에 이벤트 위임을 설정합니다.
export function setupEventListeners(root) {
  // 1. rootElement 설정
  if (rootElement) {
    // 2. 기존에 설정된 이벤트 리스너 제거 (있다면)
    eventMap.forEach((_, eventType) => {
      rootElement.removeEventListener(eventType, handleEvent, true)
    })
  }

  rootElement = root

  // 3. eventMap에 등록된 모든 이벤트 타입에 대해 루트 요소에 이벤트 리스너 추가
  eventMap.forEach((_, eventType) => {
    rootElement.addEventListener(eventType, handleEvent, true) // true는 이벤트 캡처링
  })
}

// handleEvent 함수 구현
// 이 함수는 실제 이벤트가 발생했을 때 호출되는 핸들러입니다.
function handleEvent(event) {
  const { type, target } = event
  let currentTarget = target

  // 1. 이벤트 타겟에서 시작하여 루트 요소까지 버블링
  while (currentTarget && currentTarget !== rootElement) {
    const handlers = eventMap.get(type)

    if (handlers) {
      // 2. 각 요소에 대해 해당 이벤트 타입의 핸들러가 있는지 확인
      const handlerObj = handlers.get(currentTarget)
      if (handlerObj) {
        // 3. 핸들러가 있다면 실행
        handlerObj.call(target, event)
      }
    }
    currentTarget = currentTarget.parentElement // 상위 요소로 이동
  }
}

// addEvent 함수 구현
export function addEvent(element, eventType, handler) {
  // 1. eventMap에 이벤트 타입과 요소, 핸들러 정보 저장
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, new Map())
    // 2. 필요한 경우 루트 요소에 새 이벤트 리스너 추가
    if (rootElement) {
      rootElement.addEventListener(eventType, handleEvent, true) // 캡처링 사용
    }
  }

  const handlers = eventMap.get(eventType)
  handlers.set(element, handler)
}

// removeEvent 함수 구현
export function removeEvent(element, eventType, handler) {
  // 1. eventMap에서 해당 요소와 이벤트 타입에 대한 핸들러 제거
  const handlers = eventMap.get(eventType)
  if (handlers) {
    handlers.delete(element)

    // 2. 해당 이벤트 타입의 모든 핸들러가 제거되면 루트 요소의 리스너도 제거
    if (rootElement) {
      rootElement.removeEventListener(eventType, handleEvent, true)
    }
  }
}
