interface IBasePage {
  render: (innerHTML?: string) => void;
}

export class BasePage implements IBasePage {
  #target: Element;

  constructor(target: Element) {
    this.#target = target;
  }

  render(innerHTML = '') {
    this.#target.innerHTML = innerHTML;
  }
}
