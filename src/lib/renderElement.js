import { addEvent, removeEvent, setupEventListeners } from "./eventManager";
import { createElement__v2 } from "./createElement__v2.js";
import { elementToVNode } from "./createVNode.js";
import { isNullish, isTextNode } from "../utils/typeUtils.js";


export function renderElement(vNode, container) {
  if (!container) return;
  if (container.hasChildNodes()) {
    const newNode = processVNode(vNode);
    const oldNode = processVNode(elementToVNode(container.childNodes[0]));
    updateElement(container, newNode, oldNode);
  } else {
    container.appendChild(createElement__v2(vNode));
  }
  // 이벤트 위임 설정
  setupEventListeners(container);
}
