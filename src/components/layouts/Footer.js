export default class Footer {
  constructor({ $element }) {
    this.$element = $element;
    this.render();
  }

  render() {
    const footer = document.createElement("footer");
    footer.id = "footer";
    footer.className = "bg-gray-200 p-4 text-center";

    footer.innerHTML = ` 
        <p>&copy; 2024 항해플러스. All rights reserved.</p>      
      `;
    this.$element.append(footer);
  }
}
