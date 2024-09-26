import { Footer, Header, Nav } from "./components";

export default function MainLayout({ path, page, onNavigateTo }) {
  let template = "";
  if (path === "/" || path === "/profile") {
    template = `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          ${Header.componentTemplate}
          ${Nav.componentTemplate}
          ${page.pageTemplate}
          ${Footer.componentTemplate}
        </div>
      </div>      
    `;
  } else {
    template = page.pageTemplate;
  }
  document.querySelector("#root").innerHTML = template;
  if (page.setupPage) {
    page.setupPage({ onNavigateTo });
  }
  if (path === "/" || path === "/profile") {
    Nav.setUpComponent({ path, onNavigateTo });
  }
}
