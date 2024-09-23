import { Header } from "./header";
import { Home } from "./home";
import { Login } from "./login";
import { Profile } from "./profile";

export const navigateTo = (url) => {
  history.pushState({}, "", url);
  router();
};

export const router = async () => {
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
      view: () => {
        console.log("error");
      },
    },
  ];

  /** map을 이용해서 routes에 있는 path와 location path가 일치하는 페이지가 있는지 나타내는 isMatch를 추가한 객체 리턴.*/
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
      path: routes.at(-1).path,
      view: routes.at(-1).view,
      isMatch: true,
      isHeader: false,
    };
  }

  const { getHeader } = Header();
  const { getHTML } = match.view();
  const headerComponent = await getHeader();
  const page = await getHTML();

  const root = document.querySelector("#root");
  const layout = document.createElement("div");
  layout.setAttribute("class", "bg-gray-100 min-h-screen flex justify-center");
  const pageContainer = document.createElement("div");
  pageContainer.setAttribute("class", "max-w-md w-full");

  // 다른 페이지를 route 하기전에 이전 페이지 요소들을 삭제해서 root 리셋.
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }

  // 메인과 프로필 페이지만 헤더 컴포넌트 생성
  if (match.isHeader) {
    pageContainer.appendChild(headerComponent);
  }

  //match에 맞는 page dom을 root에 새로 붙여준다.
  pageContainer.appendChild(page);
  layout.appendChild(pageContainer);
  document.querySelector("#root").appendChild(layout);

  if (!match.isHeader) return;
  document.querySelector("nav").addEventListener("click", (e) => {
    if (e.target.classList.contains("home")) {
      e.preventDefault();
      navigateTo("/");
    } else if (e.target.classList.contains("profile")) {
      e.preventDefault();
      navigateTo("/profile");
    } else if (e.target.classList.contains("login")) {
      e.preventDefault();
      navigateTo("/login");
    }
  });
};
