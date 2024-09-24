export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error('Cannot instantiate an abstract class.');
    }
  }

  render() {
    throw new Error('Abstract method must be implemented in subclass.');
  }

  mount() {
    throw new Error('Abstract method must be implemented in subclass.');
  }
}