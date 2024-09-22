export function createElement(props) {
  const { tagName, setAttribute, ...rest } = props;
  // ...rest => tagName, className, id

  const element = document.createElement(tagName);
  Object.keys(rest).forEach((key) => {
    element[key] = props[key];
  });

  setAttribute &&
    Object.keys(setAttribute).forEach((key) => {
      element.setAttribute(key, setAttribute[key]);
    });

  return element;
}
