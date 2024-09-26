import { Component, ErrorBoundary } from "../base";

class Footer extends Component {
  constructor(targetElement) {
    super(targetElement, {});
  }

  render() {
    this.targetElement.innerHTML = `
      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
        <a href="https://www.flaticon.com/kr/free-icons/" title="개구리 아이콘" class="text-xs">개구리 아이콘 제작자: amonrat rungreangfangsai - Flaticon</a>
      </footer>
    `;
  }
}

function handleFooterComponent(targetElement) {
  const component = new Footer(targetElement);
  const renderComponent = new ErrorBoundary(targetElement, component.render.bind(component));
  const handleComponent = renderComponent.render.bind(renderComponent);
  return handleComponent;
}
export default handleFooterComponent;
