import { getFooterComponent } from "../../layouts/Footer/Footer";
import { getHeaderComponent } from "../../layouts/Header/Header";

export const getRenderComponent = (rendering) => {
  const { component, isLayout } = rendering;
  return `<div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
     ${isLayout ? getHeaderComponent() : ""}
    ${component()}
    ${isLayout ? getFooterComponent() : ""}
    </div>
  </div>`;
};
