export default class Layout {
  constructor() {
    this.element = this.createElement()
  }

  createElement() {
    const div = document.createElement('div')
    div.className = 'test'
    return div
  }

  render() {
    const appRoot = document.querySelector('#root')
    appRoot.innerHTML = ''

    appRoot.appendChild(this.element)
  }
}
