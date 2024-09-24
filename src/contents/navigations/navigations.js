import { getHomeComponent } from "../../components/pages/Home/Home";
import { getLoginComponent } from "../../components/pages/Login/Login";
import { getProfileComponent } from "../../components/pages/Profile/Profile";

export const ROUTES = {
  "/": { component: getHomeComponent, isLayout: true },
  "/login": {
    component: getLoginComponent,
    isLayout: false,
  },
  "/profile": {
    component: getProfileComponent,
    isLayout: true,
  },
};
