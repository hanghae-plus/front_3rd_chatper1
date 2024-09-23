import { render } from "../rendering/render";

export const movePage = (path) => {
  history.pushState({}, "", path);
  render(path);
};
