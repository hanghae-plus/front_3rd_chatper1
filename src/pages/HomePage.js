import HomeTemplate from '../../templates/home';

const HomePage = () => {
  const render = () => {
    const rootElement = document.getElementById('main');
    rootElement.innerHTML = HomeTemplate;
    document.title = '항해플러스 - 홈';
  };

  render();
};

export default HomePage;
