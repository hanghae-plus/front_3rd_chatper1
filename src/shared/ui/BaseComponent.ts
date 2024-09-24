export abstract class BaseComponent<S = unknown> {
  protected $root: Element | null;
  protected state: S | undefined;

  constructor(selector: string, initialState?: S) {
    this.$root = this.getRootElement(selector);
    this.state = initialState;
    if (this.$root) this.render();

    this.bindGlobalErrorHandling();
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

  setState(nextState: Partial<S>) {
    if (this.state) {
      this.state = { ...this.state, ...nextState };
    } else {
      this.state = nextState as S;
    }
    this.render();
  }

  render() {
    if (!this.$root) return;

    this.beforeRender();
    this.$root.innerHTML = this.template();
    this.afterRender();
  }

  beforeRender() {}

  afterRender() {}

  protected getElement<T extends HTMLElement>(selector: string) {
    const $element = this.$root?.querySelector(selector) as T | undefined;
    if (!$element) {
      console.error(
        `Selector "${selector}"에 해당하는 요소를 찾을 수 없습니다.`
      );
    }
    return $element;
  }

  private bindGlobalErrorHandling() {
    window.addEventListener('error', (event) => {
      if (this.$root) this.$root.innerHTML = `오류 발생! ${event.message}`;
    });
  }

  abstract template(): string;
}
