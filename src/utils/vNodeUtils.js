export function isInValidVNode(vNode) {
  return (
    vNode === undefined || vNode === null || typeof vNode === 'boolean'
    // (typeof vNode === 'number' && Number.isNaN(vNode))
  );
}

export function isEventProp(name, value) {
  return name.startsWith('on') && typeof value === 'function';
}

export function setEventProp($el, eventName, handler) {
  eventName = eventName.slice(2).toLowerCase();
  $el.addEventListener(eventName, handler);
}

// data-checked={true}일 경우 HTML에 속성이 추가될 때
// data-checked="true"로 변환 됨
export function isBooleanProp(name, value) {
  return typeof value === 'boolean' && !name.startsWith('data-');
}

export function setBooleanProp($el, name, value) {
  if (value) {
    $el.setAttribute(name, value);
    $el[name] = true;
  } else {
    $el[name] = false;
  }
}

export function removeBooleanProp($target, name) {
  $target.removeAttribute(name);
  $target[name] = false;
}

export function setStyleProp($el, styles) {
  if (typeof styles === 'string') {
    $el.setAttribute('style', styles);
  } else {
    Object.keys(styles).forEach((name) => {
      const kebabCaseName = name.replace(/([A-Z])/g, '-$1').toLowerCase();
      $el.style[kebabCaseName] = styles[name];
    });
  }
}
