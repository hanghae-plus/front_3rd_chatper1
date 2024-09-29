export function flattenChildren(children) {
  return children.reduce(
    (flatted, child) =>
      Array.isArray(child)
        ? [...flatted, ...flattenChildren(child)]
        : [...flatted, child],
    []
  );
}
