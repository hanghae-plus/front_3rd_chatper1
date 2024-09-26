import { renderLayout } from "./layouts/layout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import Router from "./utils/router";

const routes = [
  { path: "/", view: () => renderLayout(HomePage) },
  {
    path: "/profile",
    view: () => renderLayout(ProfilePage),
  },
  { path: "/login", view: LoginPage },
  { path: "*", view: NotFoundPage },
];

new Router(routes);
