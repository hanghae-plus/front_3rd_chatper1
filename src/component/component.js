export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error('Cannot instantiate an abstract class.');
    }
  }

  template() {
    throw new Error('Abstract method must be implemented in subclass.');
  }

  render() {
    document.getElementById('root').innerHTML = this.template();
  }

  mount() {
    throw new Error('Abstract method must be implemented in subclass.');
  }

  unmount() {
    throw new Error('Abstract method must be implemented in subclass.');
  }
}