import LoginPage from "./pages/Login.js";
import MainPage from "./pages/Main.js";
import ProfilePage from "./pages/Profile.js";
import ErrorPage from "./pages/Error.js";

const renderPage = () => {
  const currentRoute = window.location.pathname;
  let currentPage;

  switch (currentRoute) {
    case "/":
      currentPage = MainPage();
      break;

    case "/login":
      currentPage = LoginPage();
      break;

    case "/profile":
      if (!localStorage.getItem("user")) {
        currentPage = LoginPage();
      } else {
        currentPage = ProfilePage();
      }
      break;

    default:
      currentPage = ErrorPage();
  }

  document.querySelector("#root").innerHTML = currentPage;
};

window.addEventListener("popstate", () => {
  renderPage();
});

document.addEventListener("DOMContentLoaded", () => {
  renderPage();
});
