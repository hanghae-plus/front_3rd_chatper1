import {
  IS_PATCH,
  ROUTES,
} from "../../components/contents/navigations/navigations";

export const render = (path) => {
  const component = ROUTES[path] || ROUTES["/404"];
  const container = IS_PATCH.includes(path) ? "#main" : "#root";
  document.querySelector(container).innerHTML = component();
};
