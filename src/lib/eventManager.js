// eventManager.js

let rootElement = null;

export function setupEventListeners(container) {
  rootElement = container;
  ['click', 'submit', 'input', 'change'].forEach((eventType) => {
    container.addEventListener(eventType, handleEvent, true);
  });
}

function handleEvent(event) {
  // 이벤트 전파가 이미 중단되었는지 확인
  if (
    event.eventPhase === Event.CAPTURING_PHASE &&
    (event.cancelBubble || event.defaultPrevented)
  ) {
    return;
  }

  let target = event.target;
  const eventType = event.type;

  while (target && target !== rootElement) {
    if (target.hasAttribute(`data-event-${eventType}`)) {
      const handler = target[`__${eventType}Handler`];
      if (handler) {
        handler.call(target, event);
        if (event.cancelBubble || event.defaultPrevented) break;
      }
    }
    target = target.parentElement;
  }
}

export function addEvent(element, eventType, handler, options = {}) {
  element.setAttribute(`data-event-${eventType}`, '');
  element[`__${eventType}Handler`] = function (event) {
    if (options.stopPropagation) {
      event.stopPropagation();
    }
    if (options.preventDefault) {
      event.preventDefault();
    }
    return handler.call(this, event);
  };
}

export function removeEvent(element, eventType) {
  element.removeAttribute(`data-event-${eventType}`);
  delete element[`__${eventType}Handler`];
}
