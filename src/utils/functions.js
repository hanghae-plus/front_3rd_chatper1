// popstate 이벤트는 back에 반응한다.
// pushState를 두번 저장한 뒤 back을 해야 원하는 곳으로 이동 1회
export function movePage(path = '') {
  history.pushState({}, '', path);
  history.pushState({}, '', path);
  history.back();
}
