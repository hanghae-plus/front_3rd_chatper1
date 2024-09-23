export const ROUTES = {
  HOME: { path: "/", id: "home", name: "홈" },
  PROFILE: { path: "/profile", id: "profile", name: "프로필" },
  LOGIN: { path: "/login", id: "login", name: "로그인" },
  LOGOUT: { id: "logout", name: "로그아웃" },
};

export const TAB_LIST = [
  ROUTES.HOME,
  ROUTES.PROFILE,
  ROUTES.LOGOUT,
  ROUTES.LOGIN,
];

export const PUBLIC_PATH = [ROUTES.HOME, ROUTES.LOGIN];
export const AUTH_PATH = [ROUTES.HOME, ROUTES.PROFILE, ROUTES.LOGOUT];

export const PERMISSION = {
  PUBLIC: {
    key: "PUBLIC",
    path: PUBLIC_PATH,
  },
  AUTH: {
    key: "AUTH",
    path: AUTH_PATH,
  },
};

export const STORAGE_KEY = {
  USER: "user",
};
