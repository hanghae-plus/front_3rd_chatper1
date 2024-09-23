export default class DefaultView {
  #navigation = '';
  #content = '';
  #footer = '';

  constructor() {}

  setNavigation(navigation) {
    this.#navigation = navigation;
  }
  setContent(content) {
    this.#content = content;
  }
  setFooter(footer) {
    this.#footer = footer;
  }

  build() {
    return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        
        ${this.#navigation}
        ${this.#content}
        ${this.#footer}
      </div>
    </div>
    `;
  }
}
