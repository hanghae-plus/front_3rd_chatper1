interface IBasePage {
  render: (innerHTML?: string) => void;
}

export class BasePage implements IBasePage {
  #target: Element;

  constructor(target: Element) {
    this.#target = target;
  }

  render() {
    this.#target.innerHTML = this.template();
  }

  template() {
    return '';
  }
}
