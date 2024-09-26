import Storage from './utils/storage.js';

export const createRouter = () => {
  const routes = {};

  const addRoute = (path, component) => {
    routes[path] = component;
  };

  const render = () => {
    const path = window.location.pathname;
    const isUser = checkUserLoggedIn();

    if (shouldRedirectLogin(isUser, path)) {
      return navigate("/");
    } else if (shouldRedirectProfile(isUser, path)) {
      return navigate("/login");
    }

    const route = routes[path] || routes["/404"];
    document.querySelector("#root").innerHTML = route();
  };

  const checkUserLoggedIn = () => {
    return Storage.loadData("user");
  };

  const shouldRedirectLogin = (isUser, path) => {
    return isUser && path === "/login";
  };

  const shouldRedirectProfile = (isUser, path) => {
    return !isUser && path === "/profile";
  };

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    render();
};

  return { addRoute, render, navigate };
};
