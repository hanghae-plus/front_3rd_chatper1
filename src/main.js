import Footer from "./components/layouts/Footer.js";
import Header from "./components/layouts/Header.js";
import routes from "./routes";

export default class App {
  constructor($element) {
    this.$element = $element;
    this.render();
    this.setTemplate();
  }

  render() {
    this.$element.innerHTML = `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        <header></header>
        <main class="p-4"></main>
        <footer></footer>
      </div>
    </div>
    `;
  }

  setTemplate() {
    this.router = routes(this.$element.querySelector("main"));
    this.header = new Header({
      $element: this.$element.querySelector("header"),
      router: this.router,
    });

    this.footer = new Footer({
      $element: this.$element.querySelector("footer"),
    });
  }
}

new App(document.querySelector("#root"));
