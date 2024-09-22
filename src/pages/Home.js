import HomePage from '../../templates/HomePage';

export const Home = () => {
  const render = () => {
    const rootElement = document.getElementById('main');
    rootElement.innerHTML = HomePage;
  };

  render();
};
