import { getHomeComponent } from "../../pages/Home/Home";
import { getLoginComponent } from "../../pages/Login/Login";
import { getProfileComponent } from "../../pages/Profile/Profile";

export const ROUTES = {
  "/": getHomeComponent,
  "/login": getLoginComponent,
  "/profile": getProfileComponent,
};

export const IS_PATCH = ["/", "/login"];
export const IS_ROOT = ["/login", "/profile"];
export const IS_MAIN = ["/", "/profile"];
