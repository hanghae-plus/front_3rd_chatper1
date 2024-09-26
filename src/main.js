import routes from "./routes";

export default class App {
  constructor($element) {
    this.$element = $element;
    this.render();
  }

  render() {
    this.$element.innerHTML = `
       <div class="bg-gray-100 min-h-screen flex justify-center">
        <div id="container" class="max-w-md w-full"></div>
      </div> `;
    this.router = routes(this.$element.querySelector("#container"));
  }
}

new App(document.querySelector("#root"));
