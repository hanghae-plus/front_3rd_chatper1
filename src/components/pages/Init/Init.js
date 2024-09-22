import { getFooterComponent } from "../../layouts/Footer/Footer";
import { getHeaderComponent } from "../../layouts/Header/Header";
import { getHomeComponent } from "../Home/Home";

export const getInitComponent =
  () => `<div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
    ${getHeaderComponent()}
    ${getHomeComponent()}
    ${getFooterComponent()}
    </div>
  </div>`;
