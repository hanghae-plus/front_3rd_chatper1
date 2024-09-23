import HomeTemplate from '../../templates/home';

const HomePage = () => {
  const render = () => {
    const rootElement = document.getElementById('main');
    rootElement.innerHTML = HomeTemplate;
  };

  render();
};

export default HomePage;
