const eventHandlers = {};

const handleGlobalEvents = (e) => {
  const handlers = eventHandlers[e.type];
  if (!handlers) return;

  for (const selector in handlers) {
    if (e.target.matches(selector)) {
      handlers[selector](e);
      break;
    }
  }
};

export const registerGlobalEvents = (() => {
  let init = false;
  return () => {
    if (init) {
      return;
    }

    Object.keys(eventHandlers).forEach((eventType) => {
      document.body.addEventListener(eventType, handleGlobalEvents);
    });

    init = true;
  };
})();

export const addEvent = (eventType, selector, handler) => {
  if (!eventHandlers[eventType]) {
    eventHandlers[eventType] = {};
  }
  eventHandlers[eventType][selector] = handler;
};

export const ALL_EVENTS = [
  // UI 이벤트 (UI Events)
  "load",
  "unload",
  "error",
  "resize",
  "scroll",
  "select",

  // 마우스 이벤트 (Mouse Events)
  "click",
  "dblclick",
  "mousedown",
  "mouseup",
  "mousemove",
  "mouseover",
  "mouseout",
  "mouseenter",
  "mouseleave",
  "contextmenu",
  "wheel",

  // 키보드 이벤트 (Keyboard Events)
  "keydown",
  "keypress",
  "keyup",

  // 입력 이벤트 (Input Events)
  "input",
  "change",
  "focus",
  "blur",
  "select",
  "submit",
  "reset",

  // 폼 이벤트 (Form Events)
  "submit",
  "reset",
  "focus",
  "blur",
  "invalid",

  // 터치 이벤트 (Touch Events)
  "touchstart",
  "touchmove",
  "touchend",
  "touchcancel",

  // 드래그 이벤트 (Drag Events)
  "drag",
  "dragstart",
  "dragend",
  "dragenter",
  "dragover",
  "dragleave",
  "drop",

  // 포인터 이벤트 (Pointer Events)
  "pointerdown",
  "pointerup",
  "pointermove",
  "pointerover",
  "pointerout",
  "pointerenter",
  "pointerleave",
  "pointercancel",
  "gotpointercapture",
  "lostpointercapture",

  // 포커스 이벤트 (Focus Events)
  "focus",
  "blur",
  "focusin",
  "focusout",

  // 미디어 이벤트 (Media Events)
  "play",
  "pause",
  "ended",
  "volumechange",
  "waiting",
  "seeking",
  "seeked",
  "timeupdate",
  "durationchange",
  "loadedmetadata",
  "loadeddata",
  "canplay",
  "canplaythrough",
  "stalled",
  "error",

  // 진행 및 파일 이벤트 (Progress and File Events)
  "loadstart",
  "progress",
  "abort",
  "error",
  "load",
  "timeout",
  "loadend",

  // CSS 애니메이션 이벤트 (CSS Animation Events)
  "animationstart",
  "animationend",
  "animationiteration",

  // CSS 트랜지션 이벤트 (CSS Transition Events)
  "transitionstart",
  "transitionend",
  "transitionrun",
  "transitioncancel",

  // 페이지 라이프사이클 이벤트 (Page Lifecycle Events)
  "visibilitychange",
  "pagehide",
  "pageshow",
  "beforeunload",
  "unload",

  // 네트워크 이벤트 (Network Events)
  "online",
  "offline",

  // 웹 소켓 이벤트 (WebSocket Events)
  "open",
  "message",
  "error",
  "close",

  // 클립보드 이벤트 (Clipboard Events)
  "copy",
  "cut",
  "paste",

  // 윈도우 이벤트 (Window Events)
  "resize",
  "scroll",
  "beforeprint",
  "afterprint",
  "hashchange",
  "popstate",
  "storage",
];
