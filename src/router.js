import Home from "./components/HomePage";
import Profile from "./components/ProfilePage";

export const navigateTo = (url) => {
  history.pushState({}, "", url);
  router();
};
const root = document.querySelector('#root')

export const routes = [
  // { path: "/", view: () => {
  //     window.location.replace("/main");  // '/' 접속 시 '/main'으로 리다이렉트
  //   }
  // },
  { path: "/", view: ()=> new Home(root), name: '홈' },
  { path: "/login", view: () => console.log("로그인"), name: '로그인' },
  { path: "/profile", view: ()=>new Profile(root), name: '프로필' },
  { path: "/404", view: () => console.log("404 페이지"), name: '404' },
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
      path: routes.at(-1).path,
      view: routes.at(-1).view,
      isMatch: true,
    };
  }

  matchRoute.view();
};
