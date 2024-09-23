import { getErrorComponent } from "../../pages/Error/Error";
import { getHomeComponent } from "../../pages/Home/Home";
import { getLoginComponent } from "../../pages/Login/Login";

export const ROUTES = {
  "/": getHomeComponent,
  "/login": getLoginComponent,
};

export const IS_PATCH = ["/", "/login"];
