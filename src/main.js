import Footer from './components/layouts/Footer.js';
import Header from './components/layouts/Header.js';
import routes from './routes';
import Router from './router/Router.js';

export default class App {
  constructor($element) {
    this.$element = $element;
    this.render();
    this.setTemplate();
  }

  render() {
    this.$element.innerHTML = `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div id="container" class="max-w-md w-full">
      </div>
    </div>
    `;
  }

  setTemplate() {
    const router = new Router();

    const header = new Header({
      $element: this.$element.querySelector('#container'),
      router: router,
    });
    const footer = new Footer({
      $element: this.$element.querySelector('#container'),
      router: router,
    });
    this.router = routes(
      this.$element.querySelector('#container'),
      header,
      footer
    );
    // this.header = new Header({
    //   $element: this.$element.querySelector('header'),
    //   router: this.router,
    // });

    // this.footer = new Footer({
    //   $element: this.$element.querySelector('footer'),
    // });
  }
}

new App(document.querySelector('#root'));
