import { addEvent } from "./eventManager";

export const createElement__v2 = (vNode) => {
  if (!vNode || typeof vNode === "boolean") {
    return document.createTextNode("");
  }

  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(String(vNode));
  }

  if (Array.isArray(vNode)) {
    const fragment = new DocumentFragment();
    vNode
      .map(createElement__v2)
      .forEach((child) => fragment.appendChild(child));
    return fragment;
  }

  if (typeof vNode.type === "function") {
    return createElement__v2(vNode.type(vNode.props, vNode.children));
  }

  const element = document.createElement(vNode.type);

  Object.entries(vNode.props || {}).forEach(([attr, value]) => {
    setElementAttribute(element, attr, value);
  });

  (vNode.children || [])
    .map((child) => createElement__v2(child))
    .forEach((childElement) => {
      element.appendChild(childElement);
    });

  return element;
};

const setElementAttribute = (element, attr, value) => {
  //조건
  const condition = {
    event: (attr, value) =>
      attr.startsWith("on") && typeof value === "function",
    className: (attr, value) => attr === "className",
    style: (attr, value) => attr === "style" && typeof value === "object",
    default: () => true,
  };

  //액션
  const handler = {
    event: (attr, value) =>
      addEvent(attr.slice(2).toLowerCase(), element, value),
    className: (_, value) => element.setAttribute("class", value || ""),
    style: (_, value) =>
      Object.entries(value)
        .filter(
          ([, styleValue]) => styleValue !== undefined && styleValue !== null
        )
        .forEach(([styleKey, styleValue]) => {
          try {
            element.style[styleKey] = String(styleValue);
          } catch (error) {
            console.warn(
              `스타일을 설정하는데 실패했습니다. [${styleKey}]:`,
              error
            );
          }
        }),
    default: (attr, value) => element.setAttribute(attr, value),
  };

  const propType = Object.keys(condition).find((type) =>
    condition[type](attr, value)
  );
  handler[propType](attr, value);
};
