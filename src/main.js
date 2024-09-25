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
      handleLogout();
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

const handleLogin = () => {
  const username = document.querySelector("#username").value;
  localStorage.setItem(
    "user",
    JSON.stringify({ username, email: "", bio: "" })
  );
  navigate("/profile");
};

const handleLogout = () => {
  localStorage.removeItem("user");
};

document.addEventListener("click", (event) => {
  handleLinkClick(event);
});

document.addEventListener("submit", (event) => {
  if (event.target.id === "login-form") {
    event.preventDefault();
    handleLogin();
  }
});

window.addEventListener("popstate", () => {
  renderPage();
});

document.addEventListener("DOMContentLoaded", () => {
  renderPage();
});
