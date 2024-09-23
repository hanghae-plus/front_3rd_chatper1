import Home from './pages/Home';

const render = (page) => {
  console.log(page);
  document.querySelector('#root').innerHTML = page;
};

render(Home());
