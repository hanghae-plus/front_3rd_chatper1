import { Footer } from "./\bfooter";
import { Error } from "./error";
import { Header, LoginHeader } from "./header";
import { Home } from "./home";
import { Login } from "./login";
import { Profile } from "./profile";

export const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

export const router = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && location.pathname === "/login") {
    navigateTo("/");
    return;
  }

  if (!user && location.pathname === "/profile") {
    navigateTo("/login");
    return;
  }

  const routes = [
    {
      path: "/",
      view: Home,
    },
    {
      path: "/profile",
      view: Profile,
    },
    {
      path: "/login",
      view: Login,
    },
    {
      path: "/404",
      view: Error,
    },
  ];

  /** map을 이용해서 routes에 있는 path와 location path가 일치하는 페이지가 있는지 나타내는
   * isMatch와 isHeader 추가한 객체 리턴.*/
  const matchPathnames = routes.map((route) => {
    return {
      ...route,
      isMatch: location.pathname === route.path,
      isHeader: location.pathname === "/" || location.pathname === "/profile",
    };
  });

  let match = matchPathnames.find((matchPathname) => matchPathname.isMatch);

  if (!match) {
    match = {
      path: "/404",
      view: Error,
      isMatch: true,
      isHeader: false,
      isFooter: false,
    };
  }

  const { getHTML } = match.view();
  const page = getHTML();
  const { getHeader } = Header();
  const { getLoginHeader } = LoginHeader();
  const headerComponent = getHeader();
  const loginHeaderComponent = getLoginHeader();
  const { getFooter } = Footer();
  const footerComponent = getFooter();

  const root = document.querySelector("#root");
  // 다른 페이지를 route 하기전에 이전 페이지 요소들을 삭제해서 root 리셋.
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }

  const layout = document.createElement("div");
  layout.setAttribute("class", "bg-gray-100 min-h-screen flex justify-center");
  const pageContainer = document.createElement("div");
  pageContainer.setAttribute("class", "max-w-md w-full");

  // 메인과 프로필 페이지만 헤더 컴포넌트 생성
  if (match.isHeader) {
    user
      ? pageContainer.appendChild(loginHeaderComponent)
      : pageContainer.appendChild(headerComponent);
    pageContainer.appendChild(page);
    pageContainer.appendChild(footerComponent);
    layout.appendChild(pageContainer);
    root.appendChild(layout);
    return;
  }

  //match에 맞는 page dom을 root에 새로 붙여준다.
  pageContainer.appendChild(page);
  layout.appendChild(pageContainer);
  root.appendChild(layout);
};
