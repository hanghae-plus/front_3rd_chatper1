import { getErrorComponent } from "../../components/pages/Error/Error";
import { getRenderComponent } from "../../components/pages/Render/Render";
import { ROUTES } from "../../contents/navigations/navigations";
import { getUser } from "../../store/user/userStore";

export const render = (path) => {
  const user = getUser();

  if (path === "/login" && user) {
    path = "/";
  }

  const rendering = ROUTES[path] || {
    component: getErrorComponent,
    isLayout: false,
  };

  document.querySelector("#root").innerHTML = getRenderComponent(rendering);
};
