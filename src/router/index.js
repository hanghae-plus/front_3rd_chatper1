import NotFound from "@/pages/404";
import MainPage from "@/pages/main/page";
import RootLayout from "@/components/RootLayout";
import ProfilePage from "@/pages/profile/page";
import LoginPage from "@/pages/login/page";

const RootElement = document.getElementById("root");

function createPage(type) {
  const pages = {
    main: {
      render: () => MainPage(),
    },
    profile: {
      render: () => ProfilePage(),
    },
    login: {
      render: () => LoginPage(),
    },
    notFound: {
      render: () => NotFound(),
    },
  };

  return pages[type] || pages.notFound;
}

export function router() {
  const path = window.location.hash.slice(1) || "main";
  const page = createPage(path);

  RootElement.innerHTML = "";
  RootElement.appendChild(RootLayout(page.render()));
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
