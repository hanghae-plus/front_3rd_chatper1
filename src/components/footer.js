export default class Footer {
  $target;
  state;
  constructor ($target) { // 클래스 생성자 함수. mouted같아 
    this.$target = $target;
    this.render();
  }
  render () {
    this.$target.innerHTML = this.template();
  }
  template () { 
    return `
      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
    ` 
  }
}