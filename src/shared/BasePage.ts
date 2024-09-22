interface IBasePage {
  render: (innerHTML?: string) => void;
}

export abstract class BasePage implements IBasePage {
  #target: Element;

  constructor(target: Element) {
    this.#target = target;
  }

  render() {
    this.#target.innerHTML = this.template();
    this.afterRender();
  }

  afterRender() {}

  abstract template(): string;
}
