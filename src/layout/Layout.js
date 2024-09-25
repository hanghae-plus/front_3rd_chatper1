import Header from "./Header.js";
import Footer from "./Footer.js";

const Layout = (content) => {
  return /* HTML */ `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">${Header()}${content} ${Footer()}</div>
    </div>
  `;
};

export default Layout;
