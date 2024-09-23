import {
  IS_ROOT,
  ROUTES,
} from "../../components/contents/navigations/navigations";
import { getErrorComponent } from "../../components/pages/Error/Error";

export const render = (path) => {
  const component = ROUTES[path] || getErrorComponent;
  const container = IS_ROOT.includes(path) ? "#root" : "#main";
  document.querySelector(container).innerHTML = component();
};
