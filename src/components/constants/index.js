import { HomeComponent, LoginComponent, ProfileComponent } from "../../main";

export const ROUTES = {
  HOME: { path: "/", id: "home", name: "홈" },
  PROFILE: { path: "/profile", id: "profile", name: "프로필" },
  LOGIN: { path: "/login", id: "login", name: "로그인" },
  LOGOUT: { id: "logout", name: "로그아웃" },
};

export const PERMISSION = {
  PUBLIC: "public",
  AUTH: "auth",
};

export const ROUTE_COMPONENT_LIST = [
  {
    path: ROUTES.HOME.path,
    component: (target, props) => new HomeComponent(target, props),
  },
  {
    path: ROUTES.PROFILE.path,
    component: (target, props) => new ProfileComponent(target, props),
  },
  {
    path: ROUTES.LOGIN.path,
    component: (target, props) => new LoginComponent(target, props),
  },
];
export const TAB_LIST = [
  ROUTES.HOME,
  ROUTES.PROFILE,
  ROUTES.LOGOUT,
  ROUTES.LOGIN,
];

export const PUBLIC_PATH = [ROUTES.HOME, ROUTES.LOGIN];
export const AUTH_PATH = [ROUTES.HOME, ROUTES.PROFILE, ROUTES.LOGOUT];

export const STORAGE_KEY = {
  USER: "user",
};
