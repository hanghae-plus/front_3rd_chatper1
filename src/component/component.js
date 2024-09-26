export default class Component {
  _state = {};
  _children = {};
  _handleEvents = {};

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
    this.hydrate();
  }

  hydrate() {
    for (const child of Object.values(this._children)) {
      child.hydrate();
    }
  }

  dehydrate() {
    for (const child of Object.values(this._children)) {
      child.dehydrate();
    }
  }
}