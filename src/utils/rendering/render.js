import {
  IS_PATCH,
  ROUTES,
} from "../../components/contents/navigations/navigations";
import { getErrorComponent } from "../../components/pages/Error/Error";

export const render = (path) => {
  const component = ROUTES[path] || getErrorComponent;
  const container = IS_PATCH.includes(path) ? "#main" : "#root";
  document.querySelector(container).innerHTML = component();
};
