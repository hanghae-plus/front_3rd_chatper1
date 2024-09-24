import ErrorPage from "./views/error";
import LoginPage from "./views/login";
import MainPage from "./views/main";
import ProfilePage from "./views/profile";

export const routes = {
  "/": { content: MainPage, requiresAuth: false, redirectIfAuth: false },
  "/login": { content: LoginPage, requiresAuth: false, redirectIfAuth: true },
  "/profile": {
    content: ProfilePage,
    requiresAuth: true,
    redirectIfAuth: false,
  },
  "/404": { content: ErrorPage, requiresAuth: false, redirectIfAuth: false },
};
