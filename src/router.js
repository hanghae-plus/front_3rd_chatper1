import Home from "./pages/HomePage";
import Profile from "./pages/ProfilePage";
import Login from "./pages/LoginPage";
import NotFound from "./pages/NotFoundPage";

// export const navigateTo = (url) => {
//   history.pushState({}, "", url);
//   router();
// };
const root = document.querySelector('#root')

export const routes = [
  // { path: "/", view: () => {
  //     window.location.replace("/main");  // '/' 접속 시 '/main'으로 리다이렉트
  //   }
  // },
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

  matchRoute.view();
};
export const navigateTo = (path) => {
  if (path !== window.location.pathname) {
      window.history.pushState(null, '', path);
      const popStateEvent = new PopStateEvent('popstate', { state: null });
      dispatchEvent(popStateEvent);
  } else {
      console.log('no render')
  }
}
