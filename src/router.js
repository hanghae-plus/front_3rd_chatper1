import Home from "./components/home";

export const navigateTo = (url) => {
  history.pushState({}, "", url);
  router();
};
export const router = async () => {
  const root = document.querySelector('#root')
  const routes = [
    // { path: "/", view: () => {
    //     window.location.replace("/main");  // '/' 접속 시 '/main'으로 리다이렉트
    //   }
    // },
    { path: "/", view: new Home(root) },
    { path: "/login", view: () => console.log("로그인") },
    { path: "/profile", view: () => console.log("프로필페이지") },
    { path: "/404", view: () => console.log("404 페이지") },
  ];

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

  // matchRoute.view();
};
