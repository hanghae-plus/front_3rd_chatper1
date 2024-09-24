import {
  IS_ROOT,
  ROUTES,
} from "../../components/contents/navigations/navigations";
import { getErrorComponent } from "../../components/pages/Error/Error";
import { getRenderComponent } from "../../components/pages/Render/Render";

export const render = (path) => {
  const rendering = ROUTES[path] || {
    component: getErrorComponent,
    isLayout: false,
  };
  document.querySelector("#root").innerHTML = getRenderComponent(rendering);
};
