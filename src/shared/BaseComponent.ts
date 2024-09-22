interface IBaseComponent {
  render: () => void;
}

export abstract class BaseComponent implements IBaseComponent {
  #target: Element;

  constructor(selector: string) {
    const container = document.querySelector(selector);

    if (!container) {
      console.error(
        `Selector "${selector}"에 해당하는 요소를 찾을 수 없습니다.`
      );
      return;
    }

    this.#target = container;
  }

  render() {
    this.#target.innerHTML = this.template();
    this.afterRender();
  }

  afterRender() {}

  querySelector(selector: string) {
    return this.#target.querySelector(selector);
  }

  abstract template(): string;
}
