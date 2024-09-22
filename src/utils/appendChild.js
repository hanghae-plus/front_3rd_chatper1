export function appendChild({ parent, children }) {
  if (Array.isArray(children)) {
    children.forEach((child) => {
      parent.appendChild(child);
    });
  } else {
    throw new Error("자식요소는 배열이어야 합니다!!!");
  }
}
