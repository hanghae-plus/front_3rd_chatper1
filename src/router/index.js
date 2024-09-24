import NotFound from "@/pages/404";
import MainPage from "@/pages/main/page";
import RootLayout from "@/components/RootLayout";
import ProfilePage from "@/pages/profile/page";
import LoginPage from "@/pages/login/page";
import ErrorPage from "@/pages/error";

const RootElement = document.getElementById("root");

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

function Router() {
  function useNavigate(path) {
    window.history.pushState({}, "", path);
    renderPage(path);
  }

  function renderPage(path) {
    const page = createPage(path);
    RootElement.innerHTML = "";
    RootElement.appendChild(RootLayout(page.render()));
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

export const { useNavigate, init } = Router();
