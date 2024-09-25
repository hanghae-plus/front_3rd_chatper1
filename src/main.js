import LoginPage from "./pages/Login.js";
import MainPage from "./pages/Main.js";
import ProfilePage from "./pages/Profile.js";
import ErrorPage from "./pages/Error.js";

const renderPage = (path) => {
  const currentRoute = path || window.location.pathname;
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

const navigate = (path) => {
  window.history.pushState({}, "", path);
  renderPage(path);
};

const handleLinkClick = (event) => {
  if (event.target.tagName === "A" && event.target.href) {
    event.preventDefault();
    const href = event.target.getAttribute("href");
    navigate(href);
  }
};

document.addEventListener("click", (event) => {
  handleLinkClick(event);
});

window.addEventListener("popstate", () => {
  renderPage();
});

document.addEventListener("DOMContentLoaded", () => {
  renderPage();
});
