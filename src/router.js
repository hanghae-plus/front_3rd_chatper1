import LoginPage from "./pages/Login.js";
import HomePage from "./pages/Home.js";
import ProfilePage from "./pages/Profile.js";
import NotFoundPage from "./pages/NotFound.js";
import Layout from "./layout/Layout.js";
import { handleTabClick } from "./eventHandlers.js";

const renderPage = (path) => {
  const currentRoute = path || window.location.pathname;
  let currentPage;

  switch (currentRoute) {
    case "/":
      currentPage = Layout(HomePage());
      break;

    case "/login":
      if (localStorage.getItem("user")) {
        return navigate("/");
      }
      currentPage = LoginPage();
      break;

    case "/profile":
      if (!localStorage.getItem("user")) {
        currentPage = LoginPage();
      } else {
        currentPage = Layout(ProfilePage());
      }
      break;

    default:
      currentPage = NotFoundPage();
  }

  document.querySelector("#root").innerHTML = currentPage;
  handleTabClick();
};

const navigate = (path) => {
  window.history.pushState({}, "", path);
  renderPage(path);
};

export { renderPage, navigate };
