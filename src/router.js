import Home from "./pages/HomePage";
import Profile from "./pages/ProfilePage";
import Login from "./pages/LoginPage";
import NotFound from "./pages/NotFoundPage";
import Common from "./common";

const root = document.querySelector('#root');

export const routes = [
  { path: "/", view: ()=> new Home(root), name: '홈' },
  { path: "/login", view: () => new Login(root), name: '로그인' },
  { path: "/profile", view: ()=>new Profile(root), name: '프로필' },
  { path: "/404", view: () => new NotFound(root), name: '404' },
];
export const router = async () => {
  const valideRouters = routes.map((route) => {
    return {
      ...route,
      isMatch: location.pathname === route.path,
    };
  });

  let matchRoute = valideRouters.find((valideRoute) => valideRoute.isMatch);

  if (!matchRoute) {
    matchRoute = {
      path: routes.at(-1).path, // /404
      view: routes.at(-1).view, //404
      isMatch: true,
    };
  }
  // Home 클래스의 로그인 상태값을 확인
  const {isLogined} = new Common().state;

  // 라우터 가드 적용
  if (matchRoute.path === "/profile" && !isLogined) {
    // 비로그인 사용자가 프로필 페이지에 접근하려고 할 때
    navigateTo("/login");
    return;
  }

  if (matchRoute.path === "/login" && isLogined) {
    // 로그인된 사용자가 로그인 페이지에 접근하려고 할 때
    navigateTo("/");
    return;
  }
  matchRoute.view();
};
export const navigateTo = (path) => {
  if (path !== window.location.href) {
      window.history.pushState({}, '', path);
      router();
      // const popStateEvent = new PopStateEvent('popstate', { state: null });
      // dispatchEvent(popStateEvent);
      // popStateEvent.stopPropagation();
  } else {
      console.log('no render')
  }
}
