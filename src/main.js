import routes from './routes';

export default class App {
  constructor($element) {
    this.$element = $element;
    this.render();
  }

  render() {
    this.router = routes(this.$element.querySelector('#container'));
  }
}

new App(document.querySelector('#root'));
