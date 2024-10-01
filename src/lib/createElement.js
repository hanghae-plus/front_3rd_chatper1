const events = ['onClick', 'onChange', 'onInput', 'onSubmit'];

export function createElement(vNode) {
  let $el;

  if (['string', 'number', 'bigint'].includes(typeof vNode)) {
    $el = document.createTextNode(vNode);
    return $el;
  }

  if ([null, false].includes(vNode)) {
    $el = document.createTextNode('');
    return $el;
  }

  if (Array.isArray(vNode)) {
    $el = new DocumentFragment();
    vNode.forEach(element => {
      $el.appendChild(createElement(element));
    });
    return $el;
  }

  if (typeof vNode.type === 'function') {
    const $child = vNode.type(vNode.props);
    $el = createElement({ type: $child.type, props: $child.props, children: $child.children });
    return $el;
  }

  $el = document.createElement(vNode.type);

  for (let name in vNode.props) {
    let propsName = name;
    if (events.includes(name) && typeof vNode.props[name] === 'function') {
      const eventName = name.slice(2).toLocaleLowerCase();
      const eventFn = vNode.props[name];
      $el.addEventListener(eventName, eventFn);
      continue;
    }
    if (name === 'className') {
      propsName = 'class';
    }
    $el.setAttribute(propsName, vNode.props[name]);
  }

  vNode.children
    .filter(child => child !== undefined)
    .forEach(child => {
      const $child = createElement(child);
      $el.appendChild($child);
    });

  return $el;
}
