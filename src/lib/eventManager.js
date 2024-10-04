// 이벤트 위임을 위한 전역 이벤트 맵 - 이벤트 타입별로 요소와 해당 요소의 이벤트 핸들러를 저장
const eventMap = new Map();

// 이벤트 위임이 설정될 루트 요소
let rootElement = null;

/**
 * 루트 요소에 이벤트 위임을 설정
 */
export function setupEventListeners(root) {
	if (!root) return;

	// 1. rootElement 설정
	rootElement = root;
	// 2. 기존에 설정된 이벤트 리스너 제거 (있다면)
	if (eventMap.size > 0) {
		eventMap.forEach((_, eventType) => {
			rootElement.removeEventListener(eventType, handleEvent, true);
		});
	}
	// 3. eventMap에 등록된 모든 이벤트 타입에 대해 루트 요소에 이벤트 리스너 추가
	// 주의: 이벤트 캡처링을 사용하여 이벤트를 상위에서 하위로 전파
	eventMap.forEach((_, eventType) => {
		rootElement.addEventListener(eventType, handleEvent, true);
	});
}

/**
 * 실제 이벤트가 발생했을 때 호출되는 핸들러
 * - 하위 요소에서 발생한 이벤트를 이벤트맵을 통해 상위에서 효율적으로 처리한다
 */
function handleEvent(event) {
	// 1. 이벤트 타겟에서 시작하여 루트 요소까지 버블링
	let target = event.target;
	while (target && target !== rootElement) {
		// 2. 각 요소에 대해 해당 이벤트 타입의 핸들러가 있는지 확인
		if (eventMap.has(event.type)) {
			const handlerMap = eventMap.get(event.type);

			// 3. 핸들러가 있다면 실행
			if (handlerMap.has(target)) {
				const handler = handlerMap.get(target);
				handler.call(target, event); // 타겟을 명시하여 핸들러 실행
				break; // 버블링 중단
			}
		}

		target = target.parentNode;
	}
}

/**
 * eventMap에 이벤트의 타입, target이 되는 요소, 이벤트 핸들러 정보를 저장한다.
 */
export function addEvent(targetElement, eventType, handler) {
	// 새로 저장되는 eventType 인 경우
	if (!eventMap.has(eventType)) {
		// 타입에 해당하는 새로운 Map 을 생성
		eventMap.set(eventType, new Map());
	}

	// eventType에 해당하는 handlerMap을 찾아 타겟 요소와 핸들러 정보를 저장한다.
	const handlerMap = eventMap.get(eventType);
	handlerMap.set(targetElement, handler);
}

/**
 * eventMap 에 저장된 이벤트 핸들러 정보를 삭제
 */
export function removeEvent(element, eventType) {
	if (eventMap.has(eventType)) {
		const handlerMap = eventMap.get(eventType);

		// 1. eventMap에서 해당 요소와 이벤트 타입에 대한 핸들러 제거
		if (handlerMap.has(element)) {
			handlerMap.delete(element);
		}

		// 2. 해당 이벤트 타입의 모든 핸들러가 제거되면 루트 요소의 리스너도 제거
		if (handlerMap.size === 0) {
			eventMap.delete(eventType);

			if (rootElement) {
				rootElement.removeEventListener(eventType, handleEvent, true);
			}
		}
	}
}
