export const tabList = [
  {
    name: "홈",
    id: "home",
    path: "/",
    isPublic: true,
  },
  {
    name: "프로필",
    id: "profile",
    path: "/profile",
    isPublic: false,
  },
  {
    name: "로그아웃",
    id: "logout",
    path: "",
    isPublic: false,
  },
  {
    name: "로그인",
    id: "login",
    path: "/login",
    isPublic: false,
  },
];

export const publicPathIds = ["home", "login"];
export const authPathIds = ["home", "profile", "logout"];

export const STORAGE_KEY = {
  USER: "user",
};
