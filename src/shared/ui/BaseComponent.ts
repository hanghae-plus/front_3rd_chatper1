export abstract class BaseComponent<S = unknown> {
  protected $root: Element | null;
  protected state: S | undefined;

  constructor(selector: string, initialState?: S) {
    this.$root = this.getRootElement(selector);
    this.state = initialState;
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

  abstract template(): string;
}
