import NotFoundTemplate from '../../templates/notfound';

const NotFoundPage = () => {
  const render = () => {
    const rootElement = document.getElementById('main');
    rootElement.innerHTML = NotFoundTemplate;
  };

  render();
};

export default NotFoundPage;
