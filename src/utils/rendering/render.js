import { getErrorComponent } from "../../components/pages/Error/Error";
import { getRenderComponent } from "../../components/pages/Render/Render";
import { ROUTES } from "../../contents/navigations/navigations";

export const render = (path) => {
  const rendering = ROUTES[path] || {
    component: getErrorComponent,
    isLayout: false,
  };
  document.querySelector("#root").innerHTML = getRenderComponent(rendering);
};
