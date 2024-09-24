export default class Footer {
    constructor() {
      document.title = "Footer";
    }
    getHtml() {
      return `
            <footer class="bg-gray-200 p-4 text-center">
              <p>&copy; 2024 항해플러스. All rights reserved.</p>
            </footer>
        `;
    }
  }
  