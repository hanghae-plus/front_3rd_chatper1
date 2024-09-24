import Navigation from '../components/navigation';
import Footer from '../components/footer';

class DefaultView {
  template(content) {
    return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Navigation.template()}
        ${content.template()}
        ${Footer.template()}
      </div>
    </div>
    `;
  }
  activeEvents() {
    Navigation.activeEvents();
  }
}

export default new DefaultView();
