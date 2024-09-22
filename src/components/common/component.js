import { store } from '../../main';

export default class Component {
  target;
  props;
  state;

  constructor(target, props) {
    this.target = target;
    this.props = props;

    this.initState();
    this.render();
    this.bindEvents();

    store.subscribe(() => this.render());
  }

  initState() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  children() {}

  bindEvents() {}

  template() {
    return '';
  }

  render() {
    this.target.innerHTML = this.template();
    this.children();
  }
}
