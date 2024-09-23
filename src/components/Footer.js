export default function Footer() {
  this.template = () => `
      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
    `;

  this.render = () => {};

  this.setState = (newState) => {
    this.state = {
      ...this.state,
      ...newState,
    };

    this.render();
  };

  this.render();
}
