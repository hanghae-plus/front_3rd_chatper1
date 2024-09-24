class Footer {
  render(path) {
    return this.template(path); // 템플릿을 반환
  }
  template() {
    return `
        <footer class="bg-gray-200 p-4 text-center">
          <p>&copy; 2024 항해플러스. All rights reserved.</p>
        </footer>
  `;
  }
}

export default new Footer();
