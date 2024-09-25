/**
 * 페이지의 추상화
 *
 */
export default class BaseView {
  // constructor(params) {
  //   this.params = params;
  //   this.element = this.createElement();
  // }
  constructor() {
    this.element = this.createElement();
  }

  createElement() {
    const div = document.createElement('div');
    div.className = 'new-div';
    return div;
  }

  render() {
    const appRoot = document.querySelector('#root');

    // 오류 처리: root를 찾지 못했을 경우
    // if (!appRoot) {
    //   throw new Error('오류 발생! - root 못찾음');
    // }

    appRoot.innerHTML = '';

    appRoot.appendChild(this.element);
  }
}
