export abstract class BaseComponent {
  protected $root: Element | null;

  constructor(selector: string) {
    this.$root = this.getRootElement(selector);
    if (this.$root) this.render();
  }

  private getRootElement(selector: string): Element | null {
    const $root = document.querySelector(selector);
    if (!$root) {
      console.error(
        `Selector "${selector}"에 해당하는 요소를 찾을 수 없습니다.`
      );
    }
    return $root;
  }

  protected getElement<T extends HTMLElement>(selector: string): T | null {
    return this.$root?.querySelector(selector) as T | null;
  }

  render() {
    if (!this.$root) return;

    this.beforeRender();
    this.$root.innerHTML = this.template();
    this.afterRender();
  }

  beforeRender() {}

  afterRender() {}

  abstract template(): string;
}
