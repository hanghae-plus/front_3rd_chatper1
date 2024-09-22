import NotFoundPage from '../../templates/NotFoundPage';

export const NotFound = () => {
  const render = () => {
    const rootElement = document.getElementById('main');
    rootElement.innerHTML = NotFoundPage;
  };

  render();
};
