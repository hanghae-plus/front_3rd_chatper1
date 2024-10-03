import { addEvent } from './eventManager';

// 속성 적용 함수
export function applyProps(element, props) {
  for (const key in props) {
    const value = props[key];
    if (key.startsWith('on') && typeof value === 'function') {
      addEvent(key.slice(2).toLowerCase(), element, value);
    } else if (key === 'className') {
      element.className = value;
    } else {
      element.setAttribute(key, value);
    }
  }
}
