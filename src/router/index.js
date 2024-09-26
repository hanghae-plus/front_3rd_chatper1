import NotFound from "@/pages/404";
import MainPage from "@/pages/main/page";
import RootLayout from "@/components/RootLayout";
import ProfilePage from "@/pages/profile/page";
import LoginPage from "@/pages/login/page";
import ErrorPage from "@/pages/error";

import { RootElement } from "@/main";

function createPage(path) {
  const pages = {
    "/": {
      render: () => MainPage(),
    },
    "/profile": {
      render: () => ProfilePage(),
    },
    "/login": {
      render: () => LoginPage(),
    },
    "/notFound": {
      render: () => NotFound(),
    },
    "/error": {
      render: () => ErrorPage(),
    },
  };
  return pages[path] || pages["/notFound"];
}

export default function Router() {
  function useNavigate(path) {
    window.history.pushState({}, "", path);
    renderPage(path);
  }

  function renderPage(path) {
    const isLogin = !!localStorage.getItem("user");
    if (path === "/profile" && !isLogin) {
      return useNavigate("/login");
    }
    if (path === "/login" && isLogin) {
      return useNavigate("/");
    }

    const page = createPage(path);
    RootElement.replaceChildren(RootLayout(page.render()));
  }

  function init() {
    const path = window.location.pathname;
    renderPage(path);
    window.addEventListener("popstate", () => {
      renderPage(window.location.pathname);
    });
  }
  return { useNavigate, init };
}
