type Tag = string | ((props: Props, children: Children) => JSX.IntrinsicElements);
type Props = {
  [key: string]: string;
} | null;

type Children = (Node | string)[];

export function h(tag: Tag, props: Props, ...children: Children) {
  if (typeof tag === 'function') {
    return tag({ ...props }, children);
  }

  const $el = document.createElement(tag);
  if (props !== null) {
    for (let name in props) {
      if (name === 'class') {
        $el.classList.add(...props[name].trim().split(' '));
      }
      $el.setAttribute(name, props[name]);
    }
  }

  children.forEach(child => {
    $el.append(child);
  });

  return $el;
}
