
const eventMap = new Map();

let rootElement = null;

export function setupEventListeners(root) {
  if (rootElement !== root) {
    if (rootElement) {
      eventMap.forEach((handlers, eventType) => {
        rootElement.removeEventListener(eventType, handleEvent, true);
      });
    }

    rootElement = root;

    eventMap.forEach((handlers, eventType) => {
      rootElement.addEventListener(eventType, handleEvent, true);
    });
  }
}

function handleEvent(event) {
  let target = event.target;

  while (target && target !== rootElement) {
    
    const handlers = eventMap.get(event.type);
    if (handlers && handlers.has(target)) {
      const handler = handlers.get(target);
      handler(event); 
    }
    target = target.parentNode; 
  }
}


export function addEvent(element, eventType, handler) {
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, new Map());
    
    if (rootElement) {
      rootElement.addEventListener(eventType, handleEvent, true); 
    }
  }

  const handlers = eventMap.get(eventType);
  handlers.set(element, handler); 
}


export function removeEvent(element, eventType, handler) {
  if (!eventMap.has(eventType)) return;

  const handlers = eventMap.get(eventType);
  if (handlers.has(element)) {
    handlers.delete(element); 

    
    if (handlers.size === 0) {
      eventMap.delete(eventType);
      if (rootElement) {
        rootElement.removeEventListener(eventType, handleEvent, true); 
      }
    }
  }
}