export default class Common {
  $target;
  state;

  constructor ($target) { // 클래스 생성자 함수. mouted같아 
    this.$target = $target;
    const isLogined = !!(JSON.parse(localStorage.getItem('user')));
    this.setState({isLogined})
    this.setup();
    this.render();
  }
  setup () {}
  template () {}
  setTemplate() {}
  render () {}
  setEvent () {}
  setState (newState) {
    this.state = { ...this.state, ...newState };
  }
  getState() {
    return this.state;
  }
}