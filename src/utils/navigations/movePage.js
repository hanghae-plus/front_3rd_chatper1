export const movePage = (path) => {
  history.pushState({}, "", path);
  renderPage(path);
};
