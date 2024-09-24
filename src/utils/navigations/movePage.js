import { render } from "../rendering/render";

export const movePage = (path, e) => {
  if (e) {
    e.preventDefault();
  }
  history.pushState({}, "", path);
  render(path);
};
