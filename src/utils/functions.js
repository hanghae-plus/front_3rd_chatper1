export function movePage(path = '') {
  history.pushState({}, '', path);
  history.pushState({}, '', path);
  history.back();
}
