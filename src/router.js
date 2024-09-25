import LoginPage from "./pages/Login.js";
import HomePage from "./pages/Home.js";
import ProfilePage from "./pages/Profile.js";
import NotFoundPage from "./pages/NotFound.js";
import Layout from "./layout/Layout.js";
import { user as userStore } from "./store/user.js";

const updateActiveTabFromURL = () => {
  const tabs = document.querySelectorAll("a.tab");
  tabs.forEach((tab) => {
    tab.classList.remove("text-blue-600");
    tab.classList.remove("font-bold");
    tab.classList.add("text-gray-600");
  });
  const currentTab = window.location.pathname;
  const tab = document.querySelector(`a[href="${currentTab}"]`);
  if (!tab) return;
  tab.classList.remove("text-gray-600");
  tab.classList.add("text-blue-600");
  tab.classList.add("font-bold");
};

const renderPage = (path) => {
  const currentRoute = path || window.location.pathname;
  const { isLoggedIn } = userStore();
  let currentPage;

  switch (currentRoute) {
    case "/":
      currentPage = Layout(HomePage());
      break;

    case "/login":
      if (isLoggedIn()) {
        return navigate("/");
      }
      currentPage = LoginPage();
      break;

    case "/profile":
      if (!isLoggedIn()) {
        currentPage = LoginPage();
      } else {
        currentPage = Layout(ProfilePage());
      }
      break;

    default:
      currentPage = NotFoundPage();
  }

  document.querySelector("#root").innerHTML = currentPage;
  updateActiveTabFromURL();
};

const navigate = (path) => {
  window.history.pushState({}, "", path);
  renderPage(path);
};

export { renderPage, navigate };
