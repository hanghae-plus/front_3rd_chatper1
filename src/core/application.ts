export default class Application {
  root: HTMLElement;
  boundFc: {};
  constructor() {
    this.root = document.querySelector('#root')!;
  }

  bound(key: string, fn: (e: any) => void) {
    this.boundFc = { ...this.boundFc, [key]: fn.bind(this) };
  }
}
