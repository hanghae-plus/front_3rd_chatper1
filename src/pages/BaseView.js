/**
 * 페이지의 추상화
 *
 */
export default class BaseView {
  constructor(params) {
    this.params = params;
    this.element = this.createElement();
  }

  createElement() {
    const div = document.createElement('div');
    div.className = 'new-div';
    return div;
  }

  render() {
    const appRoot = document.querySelector('#root');

    // // todo: 만약 root 를 못찾았으면..??
    // if (!appRoot) {
    //   return;
    // }

    appRoot.innerHTML = '';

    appRoot.appendChild(this.element);
  }
}
