// eventManager.js

const eventMap = new Map();

let rootElement = null;

export function setupEventListeners(root) {
  if(!root){
    return;
  }
  rootElement = root;

  if(eventMap.size>0){
    eventMap.forEach((_,eventType)=>{
      rootElement.removeEventListener(eventType, handleEvent, true);

    })
  }

  eventMap.forEach((_, eventType) => {
    rootElement.addEventListener(eventType, handleEvent, true);
  });
}

function handleEvent(event) {
  const eventType = event.type;
  const handlers = eventMap.get(eventType) || []
  let currentElement = event.target;
  while (currentElement && currentElement !== rootElement){
    handlers.forEach(({element, handler}) => {
      if(currentElement === element){

        handler.call(currentElement,event)
      }
    })
    currentElement = currentElement.parentElement;
  
  }

}

// TODO: addEvent 함수 구현
export function addEvent(element, eventType, handler) {
  if (!eventMap.has(eventType)) {
		eventMap.set(eventType, [{ element, handler }]);
		if (rootElement) rootElement.addEventListener(eventType, handleEvent, true);
	} else eventMap.get(eventType).push({ element, handler });
}

// TODO: removeEvent 함수 구현
export function removeEvent(element, eventType, handler) {
  let handlers = eventMap.get(eventType) || [];
	handlers = handlers.filter((h) => h.element !== element || h.handler !== handler);

	if (handlers.length === 0) {
		eventMap.delete(eventType);
		if (rootElement) rootElement.removeEventListener(eventType, handleEvent, true);
	} else eventMap.set(eventType, handlers);
}
