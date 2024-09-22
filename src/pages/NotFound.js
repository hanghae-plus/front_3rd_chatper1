import NotFoundPage from '../../templates/NotFoundPage';

export const NotFound = () => {
  const render = () => {
    const rootElement = document.getElementById('root');
    rootElement.innerHTML = NotFoundPage;
  };

  render();
};
