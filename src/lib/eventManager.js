const eventMap = new Map();
let rootElement = null;

export const setupEventListeners = (root) => {
	rootElement = root;

	if (eventMap.size <= 0) return;
	eventMap.forEach((_, eventType) => {
		rootElement.removeEventListener(eventType, handleEvent, true);
		rootElement.addEventListener(eventType, handleEvent, true);
	});
};

const handleEvent = (event) => {
	const eventType = event.type;
	let target = event.target;

	while (target && target !== rootElement) {
		const handlers = eventMap.get(eventType);
		if (handlers) {
			handlers.forEach((h) => {
				if (h.$element === target) {
					h.handler.call(target, event);
				}
			});
		}
		target = target.parentElement;
	}
};

export const addEvent = ($element, eventType, handler) => {
	if (!eventMap.has(eventType)) {
		eventMap.set(eventType, [{ $element, handler }]);
		if (rootElement) rootElement.addEventListener(eventType, handleEvent, true);
	} else eventMap.get(eventType).push({ $element, handler });
};

export const removeEvent = ($element, eventType, handler) => {
	let handlers = eventMap.get(eventType) || [];
	handlers = handlers.filter((h) => h.$element !== $element || h.handler !== handler);

	if (handlers.length === 0) {
		eventMap.delete(eventType);
		if (rootElement) rootElement.removeEventListener(eventType, handleEvent, true);
	} else eventMap.set(eventType, handlers);
};
