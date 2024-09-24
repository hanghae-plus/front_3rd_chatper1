import NotFoundTemplate from '../../templates/notfound';

const NotFoundPage = () => {
  const render = () => {
    const rootElement = document.getElementById('main');
    rootElement.innerHTML = NotFoundTemplate;
    document.title = '항해플러스 - 오류';
  };

  render();
};

export default NotFoundPage;
